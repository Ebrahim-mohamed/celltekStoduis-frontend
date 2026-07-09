// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayout";

export const metadata: Metadata = {
  title: "Celltek Studios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
