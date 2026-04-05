"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Container,
  IconButton,
  Drawer,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Basket from "./basket";
import ModalPopup from "./modal-popup";
import HeaderSelect from "../entities/header/header-select";
import LanguageSwitcher from "../entities/header/language-switcher";
import { Category } from "@/types/product";
import type { Locale } from "@/i18n/config";

interface HeaderProps {
  categories?: Category[];
  currentLocale: Locale;
}

export default function Header({
  categories = [],
  currentLocale,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [elevated, setElevated] = React.useState(false);
  const t = useTranslations("header");

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setElevated(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── FIXED AppBar ── */}
      <AppBar
        position="fixed"
        elevation={elevated ? 4 : 0}
        sx={{ bgcolor: "#FAE900", zIndex: 1200 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: "56px", md: "64px" },
            }}
          >
            {/* Logo + Акції */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 2 },
              }}
            >
              <Link href="/" aria-label="На головну">
                <Image
                  src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
                  width={50}
                  height={50}
                  alt="Pizza House"
                  style={{ height: "auto" }}
                  priority
                />
              </Link>

              {!isMobile && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<LocalOfferIcon sx={{ fontSize: 15 }} />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: 13,
                    px: 2,
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none" },
                  }}
                >
                  {t("promotions")}
                </Button>
              )}
            </Box>

            {/* Right */}
            {!isMobile ? (
              <Box display="flex" alignItems="center" gap={0.5}>
                {/* Language switcher — replaces old HeaderSelect for lang */}
                <LanguageSwitcher currentLocale={currentLocale} />
                <HeaderSelect
                  title={t("phone")}
                  links={["38000000000", "18000000000"]}
                />
                <ModalPopup />
                <Basket />
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <Basket />
                <IconButton
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Відкрити меню"
                >
                  <MenuIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer */}
      <Box sx={{ height: { xs: "56px", md: "64px" } }} aria-hidden="true" />

      {/* ── CATEGORY STRIP — sticky, не в AppBar ── */}
      {categories.length > 0 && (
        <Box
          sx={{
            bgcolor: "#FAE900",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            position: "sticky",
            top: { xs: "56px", md: "64px" },
            zIndex: 1100,
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                px: { xs: 1, md: 2 },
                py: "8px",
                gap: "4px",
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.url}`}
                  style={{ textDecoration: "none", flexShrink: 0 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      px: { xs: "8px", md: "10px" },
                      py: "6px",
                      borderRadius: "10px",
                      minWidth: { xs: 58, md: 68 },
                      maxWidth: 80,
                      cursor: "pointer",
                      transition: "background 0.15s",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.07)" },
                      "&:active": { bgcolor: "rgba(0,0,0,0.12)" },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 32, md: 36 },
                        height: { xs: 32, md: 36 },
                        position: "relative",
                      }}
                    >
                      <Image
                        src={
                          cat.image.startsWith("http")
                            ? cat.image
                            : `https://pizzahouse.ua${cat.image}`
                        }
                        alt={cat.title}
                        fill
                        sizes="36px"
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "10px", md: "11px" },
                        lineHeight: 1.25,
                        mt: "5px",
                        textAlign: "center",
                        color: "#111",
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {cat.title}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <Image
              src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
              width={44}
              height={44}
              alt="Pizza House"
              style={{ height: "auto" }}
            />
          </Link>
          {/* Language switcher inside mobile drawer */}
          <Box display="flex" alignItems="center" gap={1}>
            <LanguageSwitcher currentLocale={currentLocale} />
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label={t("close")}
            >
              <CloseIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 1 }}>
          {categories.map((cat) => (
            <React.Fragment key={cat.id}>
              <Link
                href={`/category/${cat.url}`}
                style={{ textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: "11px",
                    px: 1,
                    borderRadius: 2,
                    "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={
                        cat.image.startsWith("http")
                          ? cat.image
                          : `https://pizzahouse.ua${cat.image}`
                      }
                      alt={cat.title}
                      fill
                      sizes="40px"
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, color: "#111" }}
                  >
                    {cat.title}
                  </Typography>
                </Box>
              </Link>
              <Divider sx={{ opacity: 0.2 }} />
            </React.Fragment>
          ))}
        </Box>

        <Box sx={{ px: 2, py: 2, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <ModalPopup />
          <Box display="flex" gap={1} mt={1}>
            <IconButton aria-label="Instagram" size="small">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Facebook" size="small">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Telegram" size="small">
              <TelegramIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
