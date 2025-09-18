// app/layout.jsx
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/app/Components/ThemeProvider";
import Navbar from "./Components/Navbar";
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
