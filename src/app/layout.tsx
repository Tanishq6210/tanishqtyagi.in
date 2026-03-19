import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanishq Tyagi | Software Engineer & Data Engineer",
  description:
    "Portfolio of Tanishq Tyagi – Software Engineer & Data Engineer specializing in scalable backend systems, big data pipelines, and applied ML/NLP.",
  openGraph: {
    title: "Tanishq Tyagi | Software Engineer & Data Engineer",
    description:
      "Explore projects, experience, and skills in backend engineering, big data, and ML/NLP.",
    url: "https://tanishqtyagi.in",
    type: "website",
  },
  metadataBase:
    typeof window === "undefined"
      ? new URL("https://tanishqtyagi.in")
      : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
