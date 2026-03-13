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
    default: "Focus Moments Studio | Best Wedding, Newborn & Maternity Photographer in Tirupati",
    template: "%s | Focus Moments Studio – Tirupati",
  },
  description:
    "Focus Moments Studio is Tirupati's most trusted photography studio, specializing in wedding photography, newborn baby photoshoots, and maternity photography. With over 8 years of experience, we deliver stunning, timeless images that capture your most precious moments. Rated 5★ on Google. Book your session today!",
  keywords: [
    // Wedding
    "wedding photographer tirupati",
    "best wedding photographer in tirupati",
    "candid wedding photography tirupati",
    "wedding photography tirupati",
    "wedding videography tirupati",
    // Newborn
    "newborn photoshoot tirupati",
    "newborn baby photography tirupati",
    "baby photoshoot tirupati",
    "best newborn photographer tirupati",
    // Maternity
    "maternity photoshoot tirupati",
    "maternity photography tirupati",
    "pregnancy photoshoot tirupati",
    "best maternity photographer tirupati",
    // General
    "Focus Moments Studio",
    "photography studio tirupati",
    "professional photographer tirupati",
    "family portrait photography tirupati",
    "pre-wedding photography tirupati",
    "birthday photoshoot tirupati",
    "event photography tirupati",
  ],
  authors: [{ name: "Focus Moments Studio", url: "https://focusmomentsstudio.in" }],
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
    title: "Focus Moments Studio | Best Wedding, Newborn & Maternity Photographer in Tirupati",
    description:
      "Tirupati's most trusted photography studio for weddings, newborn baby photoshoots & maternity sessions. 5★ rated. Book your unforgettable shoot today!",
    url: "https://focusmomentsstudio.in",
    siteName: "Focus Moments Studio",
    images: [
      {
        url: "https://focusmomentsstudio.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Focus Moments Studio – Professional Photography in Tirupati",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus Moments Studio | Best Wedding, Newborn & Maternity Photographer in Tirupati",
    description:
      "Tirupati's most trusted photography studio for weddings, newborn baby photoshoots & maternity sessions. 5★ rated. Book today!",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Focus Moments Studio",
    image: "https://focusmomentsstudio.in/og-image.jpg",
    logo: "https://focusmomentsstudio.in/og-image.jpg",
    url: "https://focusmomentsstudio.in",
    telephone: "+910832819172",
    description:
      "Focus Moments Studio is a professional photography studio in Tirupati specializing in wedding photography, newborn photoshoots, maternity photography, pre-wedding shoots, birthday events, and family portraits.",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    openingHours: "Mo-Sa 09:00-20:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "31",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "5-1-78, Sarojini Devi Rd, opp. Sri Sai multi-speciality hospital, Nehru Nagar",
      addressLocality: "Tirupati",
      addressRegion: "Andhra Pradesh",
      postalCode: "517501",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.6288",
      longitude: "79.4192",
    },
    sameAs: [
      "https://www.instagram.com/focus_momentsstudio",
      "https://www.justdial.com/Tirupati/Focus-moments-stu...",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography in Tirupati" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Newborn Photoshoot in Tirupati" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maternity Photoshoot in Tirupati" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Wedding Photography Tirupati" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Birthday Photoshoot Tirupati" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Portrait Photography Tirupati" } },
      ],
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
