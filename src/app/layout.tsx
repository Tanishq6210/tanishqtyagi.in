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
    "Backend Engineer specializing in distributed systems, scalable APIs, and data platforms.",
  metadataBase: new URL("https://tanishqtyagi.in"),
  openGraph: {
    title: "Tanishq Tyagi | Software Engineer",
    description:
      "Backend Engineer specializing in distributed systems, scalable APIs, and data platforms.",
    url: "https://tanishqtyagi.in",
    siteName: "Tanishq Tyagi Portfolio",
    images: [
      {
        url: "https://tanishqtyagi.in/icon.jpg",
        width: 585,
        height: 588,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanishq Tyagi | Software Engineer",
    description:
      "Backend Engineer specializing in distributed systems, scalable APIs, and data platforms.",
    images: ["https://tanishqtyagi.in/icon.jpg"],
  },
  icons: {
    icon: "/icon.jpg",
  },
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
