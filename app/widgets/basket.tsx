"use client";

import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  IconButton,
  Drawer,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import CardBasket from "../entities/basket/card-basket";
import { useShopStore } from "../providers/store-provider";
import { ProductWithCartId } from "../stores/cartSlice";
import { useTranslations } from "next-intl";

/**
 * Basket widget — redesigned to match pizzahouse.ua:
 * - Yellow button with cart icon + count + price in header
 * - Drawer from right (both mobile and desktop)
 * - Items displayed with CardBasket (modifier tags, remove modifier)
 * - Checkout CTA at the bottom
 */
export default function Basket() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("basket");

  const cartProducts = useShopStore((state) => state.cart);
  const totalPrice = useShopStore((state) => state.totalPrice);
  const totalCount = useShopStore((state) => state.totalCount);

  const BasketContent = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 420 },
        maxWidth: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#1a1a1a" }}
        >
          {t("title")}
        </Typography>
        <IconButton
          onClick={() => setOpen(false)}
          size="small"
          sx={{
            bgcolor: "#f5f5f5",
            "&:hover": { bgcolor: "#ebebeb" },
            borderRadius: "8px",
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Items list */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2.5,
          py: 1,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#e0e0e0",
            borderRadius: 2,
          },
        }}
      >
        {cartProducts.length > 0 ? (
          <Stack>
            {cartProducts.map((item: ProductWithCartId) => (
              <CardBasket key={item.cartItemId} product={item} />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              py: 8,
              color: "#bbb",
            }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 56, color: "#e0e0e0" }} />
            <Typography color="text.secondary" textAlign="center">
              {t("empty")}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      {cartProducts.length > 0 && (
        <Box
          sx={{
            flexShrink: 0,
            px: 2.5,
            py: 2,
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 600, color: "#1a1a1a" }}>
              {t("total")}:
            </Typography>
            <Typography
              sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#1a1a1a" }}
            >
              {totalPrice} ₴
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            component={Link}
            href="/order"
            onClick={() => setOpen(false)}
            sx={{
              borderRadius: "12px",
              bgcolor: "#FAE900",
              color: "#111",
              fontWeight: 700,
              fontSize: "1rem",
              py: 1.5,
              boxShadow: "none",
              "&:hover": { bgcolor: "#f5df00", boxShadow: "none" },
            }}
          >
            {t("checkout")}
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Trigger button — matches pizzahouse.ua yellow pill */}
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{
          borderRadius: "50px",
          py: 0.75,
          px: { xs: 1.5, sm: 2 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#FAE900",
          color: "#111",
          fontWeight: 700,
          fontSize: { xs: "0.82rem", sm: "0.88rem" },
          boxShadow: "none",
          "&:hover": { bgcolor: "#f5df00", boxShadow: "none" },
          minWidth: "auto",
        }}
      >
        <Badge
          badgeContent={totalCount}
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#111",
              color: "#FAE900",
              fontWeight: 700,
              fontSize: "0.7rem",
              minWidth: 18,
              height: 18,
            },
          }}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
        </Badge>
        {totalCount > 0 && (
          <Typography
            component="span"
            sx={{
              fontSize: "inherit",
              fontWeight: 700,
              display: { xs: "none", sm: "inline" },
            }}
          >
            {totalCount} | {totalPrice} ₴
          </Typography>
        )}
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100vw", sm: 420 },
            maxWidth: "100vw",
          },
        }}
      >
        {BasketContent}
      </Drawer>
    </>
  );
}
