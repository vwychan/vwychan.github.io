import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC, Crimson_Pro } from "next/font/google";
import "./globals.css";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-tc",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-sans-tc",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-crimson-pro",
});

export const metadata: Metadata = {
  title: "Trippie",
  description: "All-at-a-glance",
  icons: {
    icon: '/img/Trippie_logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSerifTC.variable} ${notoSansTC.variable} ${crimsonPro.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
