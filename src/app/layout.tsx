import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "@/lib/store";
import Navigation from "@/components/ui/Navigation";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echoes in Orbit",
  description: "Cast your thoughts into the cosmos. A spherical planetarium where confessions become stars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased bg-black text-white`}>
          <AppProvider>
            <Navigation />
            {children}
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
