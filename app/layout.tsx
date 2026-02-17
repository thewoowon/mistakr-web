import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mistakr — 실패도 자산이에요",
  description:
    "남의 실패에서 배우면, 내 성공 확률이 올라가요. 스타트업 실패 사례를 시각화하고, AI로 내 아이디어의 리스크를 미리 점검하세요.",
  openGraph: {
    title: "Mistakr — 실패도 자산이에요",
    description:
      "남의 실패에서 배우면, 내 성공 확률이 올라가요. 스타트업 실패 사례를 시각화하고, AI로 내 아이디어의 리스크를 미리 점검하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
