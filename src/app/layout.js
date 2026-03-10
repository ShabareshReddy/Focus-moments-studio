import { Inter, Outfit,Instrument_Serif, Playfair_Display,Gloock} from "next/font/google";
import "./globals.css";
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Focus Moments Studio | Professional Photography in Tirupati",
  description: "Top-rated photography studio in Tirupati. Specializing in baby photoshoots, family portraits, and event photography.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${outfit.variable} ${instrument.variable} ${gloock.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <GlobalLayoutWrapper>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  );
}
