import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/modals/LoginModal";
import Next_Auth_Provider from "@/providers/SessionProvider";
import getCurrentUser from "@/actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb_Clone_by_OZ",
  description: "Airbnb using NextJS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Next_Auth_Provider>
          <Toaster />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          {children}
        </Next_Auth_Provider>
      </body>
    </html>
  );
}
