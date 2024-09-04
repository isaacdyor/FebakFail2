import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { VisitorTracker } from "@/providers/visitor-provider";
import { TRPCReactProvider } from "@/trpc/react";
import Trial from "@/components/trial";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <TRPCReactProvider>
          <Trial />
          {/* <VisitorTracker />
            
          {children} */}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
