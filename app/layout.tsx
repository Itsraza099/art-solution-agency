import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata = {
  title: "Art Solution | 3D Digital Agency",
  description: "Futuristic 3D digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`} 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}