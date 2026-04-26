import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civil 3D + Dynamo 업무생산성 가이드",
  description:
    "Civil 3D + Dynamo를 중심으로 반복 설계업무를 줄이기 위한 학습자료, 샘플 그래프, 실행계획을 정리한 웹 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
