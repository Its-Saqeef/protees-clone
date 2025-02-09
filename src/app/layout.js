import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AllNavComps from "@/components/Home/AllNavComps";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer_Links/Footer";
import { StoreProvider } from "./store/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Protees - Protees.pk",
  description : "Protees at your service",
  icons : {
    icon : "/favicon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <main>
          <marquee className="bg-black text-white">This website is a clone of www.protees.pk.Clone is for practice purposes</marquee>
          <AllNavComps />
          {children}
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
      </body>
    </html>
    </StoreProvider>
  );
}
