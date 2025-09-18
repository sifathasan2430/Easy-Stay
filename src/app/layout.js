// app/layout.jsx
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";



import Header from "@/components/Header/Header";
import SessionProviderWrapper from "./Components/SessionProvider/SessionProviderWrapper";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/app/Components/ThemeProvider";

import Footer from "./Components/Footer";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Regular to Bold
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "EasyStay— Short-Term Rental Marketplace",
  description: "Developed by Team DevOps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased font-sans`}
      >
         <SessionProviderWrapper>
        <ThemeProvider attribute="class" defaultTheme="light" enableSy
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
