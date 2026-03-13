import { Outfit, Faculty_Glyphic, Instrument_Serif,Roboto, Playfair_Display,Space_Grotesk} from "next/font/google";
import "./globals.css";
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";


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
  metadataBase: new URL("https://focusmomentsstudio.in"),
  title: {
    default: "Focus Moments Studio | Professional Photography in Tirupati",
    template: "%s | Focus Moments Studio",
  },
  description: "Top-rated photography studio in Tirupati. Specializing in baby photoshoots, family portraits, and event photography.",
  keywords: ["photography", "Tirupati", "baby photoshoot", "family portraits", "wedding photography", "event photography", "Focus Moments Studio", "candid photography"],
  authors: [{ name: "Focus Moments Studio" }],
  creator: "Focus Moments Studio",
  publisher: "Focus Moments Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Focus Moments Studio | Professional Photography in Tirupati",
    description: "Top-rated photography studio in Tirupati. Specializing in baby photoshoots, family portraits, and event photography.",
    url: "https://focusmomentsstudio.in",
    siteName: "Focus Moments Studio",
    images: [
      {
        url: "https://focusmomentsstudio.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Focus Moments Studio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Moments Studio | Professional Photography in Tirupati",
    description: "Top-rated photography studio in Tirupati. Specializing in baby photoshoots, family portraits, and event photography.",
    images: ["https://focusmomentsstudio.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={` ${faculty_glyphic.variable} ${roboto.variable} ${space_grotesk.variable}  ${outfit.variable} ${instrument.variable}  ${playfair.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <GlobalLayoutWrapper>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  );
}
