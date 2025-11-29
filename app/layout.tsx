import type { Metadata } from "next";
import "./globals.css";
import { NotificationProvider } from "@/context/notification-context";

export const metadata: Metadata = {
  title: "DataNyx Health Dashboard",
  description: "Advanced ML-powered health predictions and hospital management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
