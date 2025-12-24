import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/contexts/cart-context";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
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
  title: {
    default: "Instant Connect - Smart NFC & QR Business Cards",
    template: "%s | Instant Connect",
  },
  description:
    "Connect instantly with smart NFC cards, QR cards, standees, and more. Share your profile, collect reviews, and grow your business with one tap.",
  keywords: [
    "NFC cards",
    "QR cards",
    "smart business cards",
    "digital business cards",
    "review cards",
    "AI review",
    "standees",
    "networking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#18181b",
                color: "#fff",
                borderRadius: "0.75rem",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
