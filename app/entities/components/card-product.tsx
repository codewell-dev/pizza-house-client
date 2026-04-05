"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import { Product } from "@/types/product";
import { useShopStore } from "@/app/providers/store-provider";
import { useTranslations } from "next-intl";

interface Props {
  product: Product;
}

export default function CardProduct({ product }: Props) {
  const addProductToCart = useShopStore((state) => state.addProductToCart);
  const t = useTranslations("product");

  if (!product) return null;

  return (
    <Link href={`/${product._id ?? product.id}`}>
      <Card sx={{ width: "100%", height: "100%" }}>
        <Box sx={{ position: "relative", width: "100%", height: 200 }}>
          <Image
            src={`https://pizzahouse.ua/${product.image.large}`}
            alt={product.title}
            fill
            sizes="(max-width: 600px) 100vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 1,
          }}
        >
          <Typography sx={{ ml: 1.5 }} variant="h6" component="div">
            {product.price} ₴
          </Typography>
          <Button
            sx={{ backgroundColor: "#ffeb3b", color: "black", p: 1 }}
            size="small"
            onClick={(e) => {
              e.preventDefault();
              addProductToCart(product);
            }}
          >
            {t("addToCart")}
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
