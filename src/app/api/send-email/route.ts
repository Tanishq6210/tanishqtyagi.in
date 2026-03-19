import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { profile } from "@/data/content";
import {
  sanitizeEmail,
  sanitizeMessage,
  sanitizeName,
  sanitizeSubject,
} from "@/lib/sanitize";

const JOB_ID_PATTERN = /^REF\d{6}W$/;

// Upstash / Turso KV Redis client for rate limiting across serverless instances.
// Uses the existing Turso-style env names for connectivity.
const redis = new Redis({
  url: process.env.TT_KV_REST_API_URL!,
  token: process.env.TT_KV_REST_API_TOKEN!,
});

const RATE_LIMIT_WINDOW_SECONDS = 10;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()) : [];

const sendEmailSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must be at most 100 characters long."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(254, "Email must be at most 254 characters long."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long.")
    .max(600, "Message must be at most 600 characters long."),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.join(", "),
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Email service is not configured. Missing RESEND_API_KEY.",
      },
      { 
        status: 500,
        headers: corsHeaders,
      }
    );
  }

  // Simple fixed-window rate limiting: 5 requests per 10 seconds per IP.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip =
    forwardedFor?.split(",")[0].trim() ?? realIp ?? "unknown";

  try {
    const key = `email-ip:${ip}`;
    const current = (await redis.incr(key)) ?? 0;

    if (current === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }

    if (current > RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You’re sending messages too quickly. Please wait a few seconds and try again.",
        },
        {
          status: 429,
          headers: corsHeaders,
        },
      );
    }
  } catch (error) {
    console.error("Rate limiting failed; continuing without limit:", error);
  }

  const turnstileSecretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!turnstileSecretKey) {
    return NextResponse.json(
      {
        success: false,
        error: "Turnstile is not configured. Missing TURNSTILE_SECRET_KEY.",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const fromAddress = process.env.RESEND_FROM_ADDRESS;

  if (!fromAddress) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Email service is not fully configured. Missing RESEND_FROM_ADDRESS.",
      },
      { status: 500 ,
        headers: corsHeaders,
      },
    );
  }

  try {
    const formData = await request.formData();

    const company = String(formData.get("company") || "").trim();

    if (company) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid submission.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const turnstileToken = String(formData.get("turnstileToken") || "").trim();

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Turnstile verification failed.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    try {
      const verifyResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            secret: turnstileSecretKey,
            response: turnstileToken,
          }),
        },
      );

      const verifyData = (await verifyResponse.json()) as {
        success: boolean;
        "error-codes"?: string[];
      };

      if (!verifyData.success) {
        console.error(
          "Turnstile verification failed:",
          verifyData["error-codes"],
        );
        return NextResponse.json(
          {
            success: false,
            error: "Turnstile verification failed.",
          },
          {
            status: 400,
            headers: corsHeaders,
          },
        );
      }
    } catch (error) {
      console.error("Error verifying Turnstile token:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Turnstile verification failed.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const nameRaw = String(formData.get("name") || "").trim();
    const emailRaw = String(formData.get("email") || "").trim();
    const subjectRaw = String(formData.get("subject") || "").trim();
    const messageRaw = String(formData.get("message") || "").trim();
    const mode = (String(formData.get("mode") || "message").trim() ||
      "message") as "message" | "referral";
    const resume = formData.get("resume");

    if (!subjectRaw) {
      return NextResponse.json(
        {
          success: false,
          error: "Subject is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const validationResult = sendEmailSchema.safeParse({
      name: nameRaw,
      email: emailRaw,
      message: messageRaw,
    });

    if (!validationResult.success) {
      const message =
        validationResult.error.issues
          .map((issue) => issue.message)
          .filter((value, index, self) => self.indexOf(value) === index)
          .join(" ") || "Invalid request data.";

      return NextResponse.json(
        {
          success: false,
          error: message,
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const { name, email, message } = validationResult.data;

    const safeName = sanitizeName(name);
    const safeEmail = sanitizeEmail(email);
    const safeSubject = sanitizeSubject(subjectRaw);
    const safeMessage = sanitizeMessage(message);

    if (!safeSubject) {
      return NextResponse.json(
        {
          success: false,
          error: "Subject is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    if (!safeMessage) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    let jobIdsForReferral: string[] | undefined;

    if (mode === "referral") {
      const subjectStr = subjectRaw;
      const jobIds = subjectStr
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id.length > 0);

      if (jobIds.length === 0 || jobIds.some((id) => !JOB_ID_PATTERN.test(id))) {
        return NextResponse.json(
          {
            success: false,
            error: "Job IDs are not of correct format.",
          },
          {
            status: 400,
            headers: corsHeaders,
          },
        );
      }

      jobIdsForReferral = jobIds;
    }

    const targetEmail =
      mode === "referral" ? profile.referralEmail : profile.referralEmail;

    let attachments:
      | {
          filename: string;
          content: string;
          contentType?: string;
        }[]
      | undefined;

    if (resume instanceof File && resume.size > 0) {
      if (resume.type && resume.type !== "application/pdf") {
        return NextResponse.json(
          {
            success: false,
            error: "Only PDF attachments are allowed.",
          },
          { status: 400,
            headers: corsHeaders,
           },
        );
      }

      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      attachments = [
        {
          filename: resume.name || "attachment.pdf",
          content: buffer.toString("base64"),
          contentType: resume.type || "application/pdf",
        },
      ];
    }

    const displayName = safeName || "there";

    const subjectForEmail =
      mode === "referral" && jobIdsForReferral
        ? profile.referralSubjectTemplate
            .replace("{Name}", displayName)
            .replace("{JobIds}", jobIdsForReferral.join(", "))
        : safeSubject;

    const textBody =
      mode === "referral"
        ? profile.referralBodyTemplate
            .replace("{Name}", displayName)
            .replace("{candidate_response}", safeMessage)
        : profile.messageBodyTemplate
            .replace("{Name}", displayName)
            .replace("{UserMessage}", safeMessage);

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: targetEmail,
      cc: safeEmail || undefined,
      subject: subjectForEmail,
      replyTo: safeEmail,
      text: textBody,
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email.",
        },
        { status: 500,
          headers: corsHeaders,
         },
      );
    }

    return NextResponse.json({ success: true },{headers: corsHeaders});
  } catch (error) {
    console.error("Unexpected error in /api/send-email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while sending email.",
      },
      { status: 500 ,
        headers: corsHeaders,
      },
    );
  }
}

