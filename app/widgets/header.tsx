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
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "../entities/header/header-menu";
import HeaderSelect from "../entities/header/header-select";
import Basket from "./basket";
import ModalPopup from "./modal-popup";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [elevated, setElevated] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Throttle scroll handler to avoid excessive re-renders
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
    <Box flexGrow={1}>
      <AppBar
        position="fixed"
        elevation={elevated ? 6 : 0}
        sx={{ backgroundColor: elevated ? "#fff240" : "#FAE900", zIndex: 1200 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            {/* Left side */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link href="/" aria-label="На головну">
                <Image
                  src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
                  width={55}
                  height={55}
                  alt="Pizza House logo"
                  priority
                />
              </Link>

              {!isMobile && (
                <>
                  <HeaderMenu />
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    startIcon={<LocalOfferIcon />}
                  >
                    Акція
                  </Button>
                </>
              )}
            </Box>

            {/* Right side */}
            {!isMobile ? (
              <Box display="flex" alignItems="center" gap={1}>
                <HeaderSelect title="UKR" links={["UKR", "ENG"]} />
                <HeaderSelect
                  title="8-800-000-00-00"
                  links={["38000000000", "18000000000"]}
                />
                <ModalPopup />
                <Basket />
              </Box>
            ) : (
              <IconButton color="inherit" onClick={toggleDrawer(true)} aria-label="Відкрити меню">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer to offset fixed header */}
      <Box height="80px" aria-hidden="true" />

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: 260, p: 2 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Image
            src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
            width={50}
            height={50}
            alt="Pizza House logo"
          />
          <IconButton onClick={toggleDrawer(false)} aria-label="Закрити меню">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {[
            { label: "Головна", href: "/" },
            { label: "Меню", href: "/" },
            { label: "Контакти", href: "/" },
          ].map(({ label, href }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton component={Link} href={href} onClick={toggleDrawer(false)}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<LocalOfferIcon />}
            >
              Акція
            </Button>
          </ListItem>
        </List>

        <Box mt={3} display="flex" flexDirection="column" gap={1}>
          <HeaderSelect title="UKR" links={["UKR", "ENG"]} />
          <HeaderSelect title="Телефони" links={["38000000000", "18000000000"]} />
          <ModalPopup />
          <Basket />
        </Box>
      </Drawer>
    </Box>
  );
}
