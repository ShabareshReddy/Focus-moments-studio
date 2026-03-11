import { Inter,Bodoni_Moda,Outfit,Faculty_Glyphic, Instrument_Serif,Roboto, Playfair_Display,Gloock,Space_Grotesk} from "next/font/google";
import "./globals.css";
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bodoni_moda = Bodoni_Moda({
  variable: "--font-bodoni_moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const faculty_glyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
   style: ["normal", "italic"],
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
        className={`${bodoni_moda.variable} ${faculty_glyphic.variable} ${roboto.variable} ${space_grotesk.variable} ${inter.variable} ${outfit.variable} ${instrument.variable} ${gloock.variable}  ${playfair.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <GlobalLayoutWrapper>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  );
}
