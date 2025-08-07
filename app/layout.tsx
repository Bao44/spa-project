import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/components/UserContext"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bella Spa & Nail - Làm đẹp tự nhiên, tỏa sáng rực rỡ",
  description: "Trải nghiệm dịch vụ spa và nail cao cấp với đội ngũ chuyên gia giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn vẻ đẹp hoàn hảo nhất.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
