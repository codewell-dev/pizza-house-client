"use client";

import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Menu,
  Button,
  Divider,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import CardBasket from "../entities/basket/card-basket";
import { useShopStore } from "../providers/store-provider";
import { ProductWithCartId } from "../stores/cartSlice";
import { useTranslations } from "next-intl";

export default function Basket() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const t = useTranslations("basket");

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) setDrawerOpen(true);
    else setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const cartProducts = useShopStore((state) => state.cart);
  const totalPrice = useShopStore((state) => state.totalPrice);
  const totalCount = useShopStore((state) => state.totalCount);

  const BasketContent = (
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pr: 1,
        }}
      >
        {cartProducts.length > 0 ? (
          cartProducts.map((item: ProductWithCartId) => (
            <CardBasket key={item.cartItemId} product={item} />
          ))
        ) : (
          <Typography color="text.secondary" textAlign="center" mt={4}>
            {t("empty")}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {t("promo")}
        </Typography>

        {/* Checkout button → /order page */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          component={Link}
          href="/order"
          onClick={handleClose}
          disabled={cartProducts.length === 0}
          sx={{
            borderRadius: 3,
            bgcolor: "#FAE900",
            color: "#111",
            fontWeight: 700,
            "&:hover": { bgcolor: "#f5df00" },
          }}
        >
          {t("checkout")}
        </Button>

        <Typography
          variant="subtitle1"
          textAlign="center"
          fontWeight={600}
          mt={1}
        >
          {t("total")}: {totalCount} {t("pieces")} · {totalPrice} ₴
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <>
      <Button
        id="basket-btn"
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 5,
          py: 0.7,
          px: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: isMobile ? 48 : "auto",
        }}
        variant="contained"
        color={cartProducts.length > 0 ? "secondary" : "warning"}
        startIcon={<ShoppingCartIcon />}
      >
        {isMobile
          ? totalCount
          : `${t("button")} | ${totalCount} | ${totalPrice} ₴`}
      </Button>

      {!isMobile && (
        <Menu
          id="basket-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "basket-btn" }}
          sx={{ mt: 1 }}
          PaperProps={{
            sx: {
              width: 400,
              maxHeight: "90vh",
              borderRadius: 2,
              p: 2,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {BasketContent}
        </Menu>
      )}

      {isMobile && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: 420,
              p: 2,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              {t("title")}
            </Typography>
            <IconButton onClick={handleClose} aria-label={t("closeCart")}>
              <CloseIcon />
            </IconButton>
          </Box>
          {BasketContent}
        </Drawer>
      )}
    </>
  );
}
