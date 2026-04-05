import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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
import type { Locale } from "@/i18n/config";

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
  const [categories, locale, messages] = await Promise.all([
    getCategories().catch(() => []),
    getLocale(),
    getMessages(),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppThemeProvider>
            <ShopStoreProvider>
              <Header
                categories={categories}
                currentLocale={locale as Locale}
              />
              <main>{children}</main>
              <Footer />
            </ShopStoreProvider>
          </AppThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
