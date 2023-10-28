import Navbar from "@/components/navbar/navbar"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "sonner"
import Footer from "@/components/footer/footer"
import { RainbowProviders } from "@/providers/rainbow-provider"
import TanStackQueryClientProvider from "@/providers/tanstack-query-provider"

export const metadata: Metadata = {
  title: "Escrow decentralized app",
  description: "Escrow decentralized app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen pb-40 m-0">
        <TanStackQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <RainbowProviders>
              <Navbar />
              {children}
              <Footer />
              <Toaster richColors />
            </RainbowProviders>
          </ThemeProvider>
        </TanStackQueryClientProvider>
      </body>
    </html>
  )
}
