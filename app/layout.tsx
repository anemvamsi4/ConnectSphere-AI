import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
// import { Footer } from "@/components/footer";
import "./globals.css";

const bricolage_grotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque"
});

export const metadata: Metadata = {
  title: "Connect Sphere AI - Personalized Networking Messages",
  description: "AI platform to create personalized messages for better networking and job finding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${bricolage_grotesque.variable} antialiased min-h-screen flex flex-col`}
        >
          <div className="flex-1">
            {children}
          </div>
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
