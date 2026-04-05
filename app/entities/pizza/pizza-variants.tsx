import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function ProductVariants({
  products,
  activeIndex,
  onChange,
}: Props) {
  return (
    <Box sx={{ display: "flex", gap: "6px", mt: 1, mb: 0.5, flexWrap: "wrap" }}>
      {products.map((product, index) => {
        const isActive = activeIndex === index;
        return (
          <ButtonBase
            key={product.id ?? index}
            onClick={() => onChange(index)}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              bgcolor: isActive ? "#FAE900" : "#f0ede5",
              border: isActive
                ? "1.5px solid #d4c200"
                : "1.5px solid transparent",
              transition: "all 0.15s",
              "&:hover": { bgcolor: isActive ? "#FAE900" : "#e8e4d8" },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: isActive ? 700 : 500,
                color: "#333",
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
