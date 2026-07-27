import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "NIKE AIR MAX 270 | Official Showcase",
  description: "Experience the Nike Air Max 270 with revolutionary Air heel technology. Modern design, vibrant colorways, and ultra-responsive comfort.",
  keywords: ["Nike", "Air Max 270", "Sneakers", "Running Shoes", "Nike Shoes", "Streetwear"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0f] text-white selection:bg-[#ff5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}

