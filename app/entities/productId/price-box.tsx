"use client";
import { useShopStore } from "@/app/providers/store-provider";
import { Product } from "@/types/product";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface PriceBoxProps {
  product: Product;
}

export default function PriceBox({ product }: PriceBoxProps) {
  console.log(product, "product");
  const addProductToCart = useShopStore((state) => state.addProductToCart);

  return (
    <Box
      display="flex"
      gap={1}
      mt={2}
      borderRadius={3}
      bgcolor={grey[100]}
      p={1.5}
    >
      <Typography variant="h5" width="100%" textAlign="center" my="auto">
        {product.price} ₴
      </Typography>
      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{ borderRadius: 4 }}
        onClick={() => addProductToCart(product)}
      >
        У кошик
      </Button>
    </Box>
  );
}
