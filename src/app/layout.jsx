import "./globals.css";
import { ThemeProvider } from "@/components/features/theme/theme-provider";
import Navbar from "@/components/features/nav/navbar";
import { Footer } from "@/components/features/footer";
import GlobalLayout from "@/components/splash-screen/GlobalLayout";

export const metadata = {
  title: "Tam Artsy",
  description: "Quem tem estilo, usa Tam Artsy",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="pt-br" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo/logo.svg" sizes="any" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <GlobalLayout>
              {children}
            </GlobalLayout>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
