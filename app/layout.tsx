import type { Metadata } from "next";

// Only load font weights that are actually used in the design
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import { ShopStoreProvider } from "./providers/store-provider";

export const metadata: Metadata = {
  title: {
    default: "Pizza House — замовити піцу онлайн",
    template: "%s | Pizza House",
  },
  description: "Замовляйте смачну піцу та суші онлайн з доставкою. Pizza House — швидко, свіжо, смачно.",
  openGraph: {
    siteName: "Pizza House",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <ThemeProvider theme={theme}>
        <body>
          <ShopStoreProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ShopStoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
