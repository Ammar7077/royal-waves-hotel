import type { Metadata } from "next";
import { Marcellus, Nunito_Sans } from "next/font/google";
import "./globals.css";

const display = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Royal Waves Hotel Patong | Elegant Escape in the Heart of Patong",
  description:
    "Royal Waves Hotel on Nanai Road, Patong: 69 rooms, three pools, free Wi-Fi and parking, minutes from Patong Beach and Jungceylon.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
