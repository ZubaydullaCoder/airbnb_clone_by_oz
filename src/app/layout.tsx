import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb_Clone_by_OZ",
  description: "Airbnb using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
