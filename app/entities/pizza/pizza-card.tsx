"use client";

import { Box, Typography, Button, Skeleton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useShopStore } from "../../providers/store-provider";
import { Product } from "@/types/product";
import { useCallback, useState } from "react";
import ProductVariants from "./pizza-variants";
import { useTranslations } from "next-intl";

interface PizzaCardProps {
  title: string;
  products: Product[];
}

export default function PizzaCard({ title, products }: PizzaCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const t = useTranslations("product");

  const currentProduct = products?.[activeIndex];
  const handleVariantChange = useCallback(
    (index: number) => setActiveIndex(index),
    []
  );

  if (!currentProduct) {
    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          borderRadius: "16px",
          p: 2,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 2, mb: 1.5 }}
        />
        <Skeleton width="70%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="60%" height={16} />
        <Skeleton width="100%" height={44} sx={{ mt: 2 }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Image — no crop, full pizza visible like on pizzahouse.ua */}
      <Link
        href={`/${currentProduct._id}`}
        prefetch={false}
        style={{ display: "block" }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            position: "relative",
            bgcolor: "#fafafa",
            transition: "transform 0.25s ease",
            "&:hover": { transform: "scale(1.04)" },
          }}
        >
          <Image
            src={`https://pizzahouse.ua/${currentProduct.image.large}`}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
            style={{ objectFit: "contain", padding: "8px" }}
          />
        </Box>
      </Link>

      {/* Content */}
      <Box
        sx={{
          p: "12px 16px 16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Link
          href={`/${currentProduct._id}`}
          prefetch={false}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 700,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              color: "#1a1a1a",
              mb: 0.5,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#888",
              fontSize: "0.78rem",
              lineHeight: 1.4,
              mb: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {products[0]?.description}
          </Typography>
        </Link>

        {/* Size variants */}
        {products.length > 1 && (
          <ProductVariants
            products={products}
            activeIndex={activeIndex}
            onChange={handleVariantChange}
          />
        )}

        {/* Price + button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
            pt: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Nunito", sans-serif',
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "#1a1a1a",
            }}
          >
            {currentProduct.price} ₴
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => addProductToCart(currentProduct)}
            sx={{
              bgcolor: "#FAE900",
              color: "#111",
              fontWeight: 700,
              fontSize: "0.82rem",
              borderRadius: "10px",
              px: 2,
              py: 0.8,
              boxShadow: "none",
              "&:hover": { bgcolor: "#f5df00", boxShadow: "none" },
            }}
          >
            {t("addToCart")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
