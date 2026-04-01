import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Multiple from "../components/multiple";
import Image from "next/image";
import { Product } from "@/types/product";
import { useShopStore } from "@/app/providers/store-provider";

type CardBasketProps = {
  product: Product;
};

export default function CardBasket({ product }: CardBasketProps) {
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const removeProductFromCart = useShopStore(
    (state) => state.removeProductFromCart
  );

  const basePrice = product.price * (product.count ?? 1);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          width: 100,
          height: 100,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={`https://pizzahouse.ua${product.image.large}`}
          alt={product.title}
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      {/* MAIN */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          width: "100%",
          gap: 1,
        }}
      >
        {/* LEFT SIDE */}
        <Box>
          {/* TITLE */}
          <Typography fontWeight={600}>{product.title}</Typography>
          <br />
          {/* PRICE */}
          <Typography variant="body2" fontWeight={500} mt={0.5}>
            {basePrice} ₴
          </Typography>

          {/* MODIFIERS */}
          {!!product.modifiers?.length && (
            <Box mt={1}>
              {product.modifiers.map((mod, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    fontSize: 13,
                    color: "text.secondary",
                    lineHeight: 1.4,
                  }}
                >
                  <span>
                    {mod.count > 1 ? `${mod.count}× ` : ""}
                    {mod.title}
                  </span>

                  <span>+{mod.price * (mod.count ?? 1)} ₴</span>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box display="flex" alignItems="center">
          <Multiple
            countProduct={product.count ?? 1}
            reverse
            plusCount={() => addProductToCart(product)}
            minusCount={() => removeProductFromCart(product.cartItemId)}
          />
        </Box>
      </Box>
    </Paper>
  );
}
