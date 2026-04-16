import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  activeIndex: number;
  onChange: (index: number) => void;
}

/**
 * Size variant switcher — styled like pizzahouse.ua:
 * large pill buttons showing weight, e.g. "500г", "840г"
 */
export default function ProductVariants({ products, activeIndex, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", gap: "8px", mt: 1.5, mb: 1, flexWrap: "wrap" }}>
      {products.map((product, index) => {
        const isActive = activeIndex === index;
        return (
          <ButtonBase
            key={product._id ?? product.id ?? index}
            onClick={() => onChange(index)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: "10px",
              bgcolor: isActive ? "#FAE900" : "#f5f5f5",
              border: isActive ? "2px solid #d4b800" : "2px solid transparent",
              transition: "all 0.18s ease",
              "&:hover": {
                bgcolor: isActive ? "#FAE900" : "#ebebeb",
                transform: "translateY(-1px)",
              },
              "&:active": { transform: "scale(0.97)" },
              boxShadow: isActive ? "0 2px 8px rgba(212,184,0,0.25)" : "none",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.82rem", sm: "0.88rem" },
                fontWeight: isActive ? 700 : 500,
                color: "#1a1a1a",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              {product.weight} г
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
