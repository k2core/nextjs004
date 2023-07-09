import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "엘리의 블로그",
    template: "엘리의 블로그 | %s",
  },
  description: "풀스택 개발자 엘리의 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} flex flex-col w-full max-w-screen-2xl mx-auto`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
