import { Metadata } from "next";
import { Inter } from "next/font/google";
import backGroundHome from "../../public/background-home.svg";
import "./globals.css";
import { CreateChallengeProvider } from "@/contexts/CreateChallengeContext";
import Navbar from "@/components/navbar/navbar";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainChallenge",
  description: "Chain Challenge Decentralized Algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-backgroundColor`}>
        <CreateChallengeProvider>
          <Navbar />
          {children}
        </CreateChallengeProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
