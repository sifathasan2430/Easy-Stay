import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/Components/ThemeProvider";

import Footer from "./Components/Footer";

import Header from "@/components/Header/Header";
import SessionProviderWrapper from "./Components/SessionProvider/SessionProviderWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EasyStay— Short-Term Rental Marketplace",
  description: "Develop by Team DevOps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SessionProviderWrapper>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
           <div className="relative w-full flex items-center justify-center ">
            <Header/>
          </div>
          
          <main className="min-h-screen"> 
            <Toaster/> 
            {children}
            </main> 
          <Footer/>
        </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
