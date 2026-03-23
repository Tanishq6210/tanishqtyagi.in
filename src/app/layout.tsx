import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/notification/NotificationProvider";
import { BackToTopButton } from "@/components/BackToTopButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanishq Tyagi | Software Engineer",
  description:
    "Portfolio of Tanishq Tyagi – Software Engineer",
  openGraph: {
    title: "Tanishq Tyagi | Software Engineer",
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
        <NotificationProvider>
          {children}
          <BackToTopButton />
        </NotificationProvider>
      </body>
    </html>
  );
}
