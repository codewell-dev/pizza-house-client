"use client";

import { Box, Typography, Button, Skeleton, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

/**
 * Pizza / grouped product card.
 * Redesigned to match pizzahouse.ua:
 * - Heart icon top-right
 * - Large image (object-contain, no crop)
 * - Size variant pills (large, pill-shaped)
 * - Bold price + yellow "У кошик" button
 */
export default function PizzaCard({ title, products }: PizzaCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(false);
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
        <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2, mb: 1.5 }} />
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
      {/* Image area */}
      <Box sx={{ position: "relative" }}>
        <Link href={`/${currentProduct._id}`} prefetch={false} style={{ display: "block" }}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              position: "relative",
              bgcolor: "#fafafa",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <Image
              src={`https://pizzahouse.ua${currentProduct.image.large}`}
              alt={title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
              style={{ objectFit: "contain", padding: "8px" }}
            />
          </Box>
        </Link>

        {/* Favourite heart */}
        <IconButton
          onClick={() => setLiked((v) => !v)}
          size="small"
          aria-label="add to favourites"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            width: 34,
            height: 34,
            zIndex: 1,
            "&:hover": { bgcolor: "#fff" },
          }}
        >
          {liked ? (
            <FavoriteIcon sx={{ fontSize: 18, color: "#e53935" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 18, color: "#bbb" }} />
          )}
        </IconButton>
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: "12px 14px 14px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Title */}
        <Link href={`/${currentProduct._id}`} prefetch={false} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.92rem", sm: "0.97rem" },
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
              fontSize: "0.75rem",
              lineHeight: 1.4,
              mb: 0.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {products[0]?.description}
          </Typography>
        </Link>

        {/* Size variants — large pill buttons */}
        {products.length > 1 && (
          <ProductVariants
            products={products}
            activeIndex={activeIndex}
            onChange={handleVariantChange}
          />
        )}

        {/* Price + add to cart */}
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
              fontWeight: 800,
              fontSize: "1.15rem",
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
              py: 0.9,
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
