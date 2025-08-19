import type { Metadata } from "next";
import { Jost, Cabin, Overpass } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";

const overpass = Overpass({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bella Spa & Nail - Làm đẹp tự nhiên, tỏa sáng rực rỡ",
  description:
    "Trải nghiệm dịch vụ spa và nail cao cấp với đội ngũ chuyên gia giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn vẻ đẹp hoàn hảo nhất.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={overpass.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen">{children}</main>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
