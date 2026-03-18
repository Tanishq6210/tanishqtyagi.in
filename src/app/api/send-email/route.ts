import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/content";

const JOB_ID_PATTERN = /^REF\d{6}W$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // later restrict to your domain
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

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const mode = (String(formData.get("mode") || "message").trim() ||
      "message") as "message" | "referral";
    const resume = formData.get("resume");

    if (!email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        { status: 400,
          headers: corsHeaders,
         },
      );
    }

    if (mode === "referral") {
      const subjectStr = subject;
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
    }

    const targetEmail =
      mode === "referral" ? profile.referralEmail : profile.email;

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

    const textBodyLines = [
      `Name: ${name || "N/A"}`,
      `Email: ${email}`,
      `Mode: ${mode}`,
      "",
      "Message:",
      message,
    ];

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: targetEmail,
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      text: textBodyLines.join("\n"),
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

