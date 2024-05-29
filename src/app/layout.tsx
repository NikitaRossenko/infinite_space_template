import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinite Space Template",
  description:"Made By Nikita Rossenko"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='w-screen h-screen overflow-hidden'>{children}</body>
    </html>
  );
}
