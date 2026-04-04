"use client";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useShopStore } from "../../providers/store-provider";
import { Product } from "@/types/product";
import { useCallback, useState } from "react";
import ProductVariants from "./pizza-variants";

interface PizzaCardProps {
  title: string;
  products: Product[];
}

export default function PizzaCard({ title, products }: PizzaCardProps) {
  const [active, setActive] = useState(0);
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const currentProduct = products?.[active];

  const changeActive = useCallback((index: number) => setActive(index), []);

  if (!currentProduct) {
    return (
      <Card sx={{ height: "100%", p: 2 }}>
        <Skeleton variant="rectangular" height={180} sx={{ mb: 2 }} />
        <Skeleton width="70%" height={30} />
        <Skeleton width="90%" height={16} />
        <Skeleton width="60%" height={16} />
        <Skeleton width="100%" height={50} sx={{ mt: 3 }} />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        width: "100%",
        overflow: "hidden",
        height: "100%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        "&:hover": { transform: "translateY(-2px)", transition: "0.3s ease" },
      }}
    >
      <Link href={`/${currentProduct._id}`} prefetch={false}>
        <Box
          position="relative"
          width="100%"
          maxWidth={300}
          height={{ xs: 230, sm: 270, md: 320 }}
          sx={{
            marginInline: "auto",
            transition: "transform .25s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Image
            src={`https://pizzahouse.ua/${currentProduct.image.large}`}
            alt={`Pizza ${title}`}
            fill
            sizes="(max-width: 600px) 100vw, 300px"
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Link>

      <CardContent sx={{ px: 2, py: 1 }}>
        <Link href={`/${currentProduct._id}`} prefetch={false}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              lineHeight: 1.3,
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

        <ProductVariants
          products={products}
          activeIndex={active}
          onChange={changeActive}
        />
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          pb: 2,
        }}
      >
        <Typography variant="h6">{currentProduct.price} ₴</Typography>

        <Button
          variant="contained"
          sx={{ borderRadius: 3 }}
          onClick={() => addProductToCart(currentProduct)}
        >
          У кошик
        </Button>
      </CardActions>
    </Card>
  );
}
