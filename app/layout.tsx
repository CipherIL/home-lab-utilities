import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Utils",
  description: "Index of browser utilities on this host.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
