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

import Link from "next/link";
import HeaderMenu from "../entities/header/header-menu";
import HeaderSelect from "../entities/header/header-select";
import Basket from "./basket";
import ModalPopup from "./modal-popup";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const [elevated, setElevated] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box flexGrow={1}>
      <AppBar
        position="fixed"
        elevation={elevated ? 6 : 0}
        sx={{
          backgroundColor: elevated ? "#fff240ff" : "#FAE900",

          zIndex: 1200,
        }}
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
            {/* LEFT SIDE (Logo + Desktop Menu) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link href={"/"}>
                <img
                  src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
                  style={{ width: 55, height: 55, cursor: "pointer" }}
                  alt="Logo"
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

            {/* RIGHT SIDE */}
            {!isMobile ? (
              <Box display="flex" alignItems="center" gap={1}>
                <HeaderSelect title="ENG" links={["ENG", "RUS", "UKR"]} />
                <HeaderSelect
                  title="8-800-000-00-00"
                  links={["38000000000", "18000000000", "87000000000"]}
                />
                <ModalPopup />
                <Basket />
              </Box>
            ) : (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box height="80px" />
      {/* MOBILE DRAWER MENU */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 260, backgroundColor: "#fff", p: 2 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <img
            src="https://pizzahouse.ua/_next/static/media/logo.0053162d.svg"
            style={{ width: 50 }}
            alt="Logo"
          />
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Головна" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Меню" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Контакти" />
            </ListItemButton>
          </ListItem>

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

        <Box mt={3}>
          <HeaderSelect title="ENG" links={["ENG", "RUS", "UKR"]} />
          <HeaderSelect
            title="Телефони"
            links={["38000000000", "18000000000", "87000000000"]}
          />
          <ModalPopup />
          <Basket />
        </Box>
      </Drawer>
    </Box>
  );
}
