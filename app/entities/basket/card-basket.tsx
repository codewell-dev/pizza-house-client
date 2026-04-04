import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Multiple from "../components/multiple";
import Image from "next/image";
import { useShopStore } from "@/app/providers/store-provider";
import { ProductWithCartId } from "@/app/stores/cartSlice";

interface Props {
  product: ProductWithCartId;
}

export default function CardBasket({ product }: Props) {
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const removeProductFromCart = useShopStore((state) => state.removeProductFromCart);

  const totalLinePrice = product.price * (product.count ?? 1);

  return (
    <Paper sx={{ p: 2, display: "flex", gap: 2, alignItems: "flex-start" }}>
      <Box sx={{ width: 100, height: 100, position: "relative", flexShrink: 0 }}>
        <Image
          src={`https://pizzahouse.ua${product.image.large}`}
          alt={product.title}
          fill
          sizes="100px"
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto", width: "100%", gap: 1 }}>
        <Box>
          <Typography fontWeight={600}>{product.title}</Typography>

          <Typography variant="body2" fontWeight={500} mt={0.5}>
            {totalLinePrice} ₴
          </Typography>

          {!!product.modifiers?.length && (
            <Box mt={1}>
              {product.modifiers.map((mod) => (
                <Box
                  key={mod._id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    fontSize: 13,
                    color: "text.secondary",
                    lineHeight: 1.4,
                  }}
                >
                  <span>{mod.count && mod.count > 1 ? `${mod.count}× ` : ""}{mod.title}</span>
                  <span>+{mod.price * (mod.count ?? 1)} ₴</span>
                </Box>
              ))}
            </Box>
          )}
        </Box>

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
