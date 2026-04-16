"use client";

import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useShopStore } from "@/app/providers/store-provider";
import { ProductWithCartId } from "@/app/stores/cartSlice";
import Multiple from "../components/multiple";

interface Props {
  product: ProductWithCartId;
}

export default function CardBasket({ product }: Props) {
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const removeProductFromCart = useShopStore(
    (state) => state.removeProductFromCart
  );
  const removeModifierFromCartItem = useShopStore(
    (state) => state.removeModifierFromCartItem
  );

  const totalLinePrice = product.price * (product.count ?? 1);
  const hasRemoveModifier = typeof removeModifierFromCartItem === "function";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "flex-start",
        py: 1.5,
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        "&:last-child": { borderBottom: "none" },
        borderColor: "#efefef",
      }}
    >
      {/* Product image */}
      <Box
        sx={{
          width: 80,
          height: 80,
          position: "relative",
          flexShrink: 0,
          bgcolor: "#fafafa",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          src={`https://pizzahouse.ua${product.image.large}`}
          alt={product.title}
          fill
          sizes="80px"
          style={{ objectFit: "contain", padding: "4px" }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Title row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.88rem",
              lineHeight: 1.35,
              color: "#1a1a1a",
            }}
          >
            {product.title}
            {product.weight ? (
              <Typography
                component="span"
                sx={{
                  color: "#999",
                  fontWeight: 400,
                  fontSize: "0.8rem",
                  ml: 0.5,
                }}
              >
                ({product.weight} г)
              </Typography>
            ) : null}
          </Typography>
        </Box>

        {/* Modifier tags — like pizzahouse.ua */}
        {product.modifiers?.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.75 }}>
            {product.modifiers.map((mod) => (
              <Chip
                key={mod._id}
                label={`${mod.title}${
                  mod.count && mod.count > 1 ? ` x ${mod.count}` : " x 1"
                }`}
                size="small"
                onDelete={
                  hasRemoveModifier
                    ? () =>
                        removeModifierFromCartItem(product.cartItemId, mod._id)
                    : undefined
                }
                deleteIcon={
                  <CloseIcon
                    sx={{
                      fontSize: "14px !important",
                      color: "#999 !important",
                    }}
                  />
                }
                sx={{
                  height: 24,
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  bgcolor: "#FFF9CC",
                  border: "1px solid #FAE900",
                  color: "#555",
                  borderRadius: "6px",
                  "& .MuiChip-deleteIcon": {
                    color: "#999",
                    "&:hover": { color: "#333" },
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Price + quantity controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "#1a1a1a",
            }}
          >
            {totalLinePrice} ₴
          </Typography>

          <Multiple
            countProduct={product.count ?? 1}
            reverse
            plusCount={() => addProductToCart(product)}
            minusCount={() => removeProductFromCart(product.cartItemId)}
          />
        </Box>
      </Box>
    </Box>
  );
}
