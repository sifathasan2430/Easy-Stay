
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import SessionProviderWrapper from "./Components/SessionProvider/SessionProviderWrapper";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/app/Components/ThemeProvider";

import Footer from "./Components/Footer";
import TanstackProvider from "./Components/tanstackProvider/tanstackProvider";
import ConditionalLayout from "@/components/ConditionalLayout";



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
      <body className={`${poppins.variable} ${roboto.variable} antialiased font-sans`}>
        <TanstackProvider>
          <SessionProviderWrapper>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <ConditionalLayout>{children}</ConditionalLayout>
            </ThemeProvider>
          </SessionProviderWrapper>
        </TanstackProvider>
      </body>
    </html>
  );
}
