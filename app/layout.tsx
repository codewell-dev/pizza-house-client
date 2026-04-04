import type { Metadata } from "next";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import AppThemeProvider from "./providers/theme-provider";
import Header from "./widgets/header";
import Footer from "./widgets/footer";
import { ShopStoreProvider } from "./providers/store-provider";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: {
    default: "Pizza House — замовити піцу онлайн",
    template: "%s | Pizza House",
  },
  description:
    "Замовляйте смачну піцу та суші онлайн з доставкою. Pizza House — швидко, свіжо, смачно.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetch categories once at layout level — shared across all pages
  const categories = await getCategories().catch(() => []);

  return (
    <html lang="uk" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppThemeProvider>
          <ShopStoreProvider>
            <Header categories={categories} />
            <main>{children}</main>
            <Footer />
          </ShopStoreProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
