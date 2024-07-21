"use client"

// import type { Metadata } from "next"
import { ConfigProvider } from "antd"
import { QueryClient, QueryClientProvider } from "react-query"

import MenuBar from "@/components/menu/MenuBar"
import theme from "@/theme/themeConfig"

import "./globals.css"

// export const metadata: Metadata = {
//   title: "My App",
//   description: "Small app example",
// }

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen p-8">
        <ConfigProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <MenuBar />
            <div className="mt-10">{children}</div>
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
