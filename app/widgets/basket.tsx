'use client';
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
import CardBasket from "../entities/basket/card-basket";
import { useShopStore } from "../providers/store-provider";

export default function Basket() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setDrawerOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
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
      {/* CART ITEMS */}
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
          cartProducts.map((e: any, index: number) => (
            <CardBasket key={index} product={e} />
          ))
        ) : (
          <Typography color="text.secondary" textAlign="center" mt={4}>
            Кошик порожній 🍕
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* PROMO + BUTTON */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Нд–Чт з 18:00 до закриття: піца Карбонара 30см за 100₴ або рол з
          лососем за 150₴.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={cartProducts.length === 0}
        >
          ОФОРМИТИ ЗАМОВЛЕННЯ
        </Button>

        <Typography
          variant="subtitle1"
          textAlign="center"
          fontWeight={600}
          mt={1}
        >
          Всього: {totalCount} шт · ${totalPrice}
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <>
      <Button
        id="id_btn"
        aria-controls={open ? "id_menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 5,
          py: 1,
          px: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: isMobile ? 48 : "auto",
        }}
        variant="contained"
        color={cartProducts.length > 0 ? "secondary" : "inherit"}
        startIcon={<ShoppingCartIcon />}
      >
        {isMobile ? totalCount : `CART | ${totalCount} | $${totalPrice}`}
      </Button>

      {/* Desktop menu */}
      {!isMobile && (
        <Menu
          id="id_menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "id_btn" }}
          sx={{ mt: 1 }}
          PaperProps={{
            sx: {
              width: 400,
              maxHeight: "80vh", // менше, ніж раніше
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

      {/* Mobile drawer */}
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Кошик
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {BasketContent}
        </Drawer>
      )}
    </>
  );
}
