"use client";

import { Box, ButtonBase, Typography, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pizza } from "@/types/product";

interface Props {
  currentProductId: string;
}

// Кешуємо дані між переходами, щоб не робити повторний запит
let cachedPizzas: Pizza[] | null = null;

export default function ProductVariantSwitcher({ currentProductId }: Props) {
  const router = useRouter();
  const [variants, setVariants] = useState<{ id: string; weight: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!cachedPizzas) {
          const res = await fetch("/api/pizzas-grouped");
          cachedPizzas = await res.json();
        }
        const pizza = cachedPizzas?.find((p) =>
          p.products.some((prod) => prod._id === currentProductId)
        );
        if (pizza && pizza.products.length > 1) {
          setVariants(
            pizza.products.map((p) => ({ id: p._id, weight: p.weight }))
          );
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentProductId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", gap: 1, my: 1.5 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width={64} height={32} />
        ))}
      </Box>
    );
  }

  if (variants.length <= 1) return null;

  return (
    <Box sx={{ display: "flex", gap: "6px", flexWrap: "wrap", my: 1.5 }}>
      {variants.map((v) => {
        const isActive = v.id === currentProductId;
        return (
          <ButtonBase
            key={v.id}
            onClick={() => !isActive && router.push(`/${v.id}`)}
            sx={{
              px: 1.5,
              py: 0.6,
              borderRadius: "8px",
              bgcolor: isActive ? "#FAE900" : "#f0ede5",
              border: isActive ? "1.5px solid #d4c200" : "1.5px solid transparent",
              transition: "all 0.15s",
              "&:hover": { bgcolor: isActive ? "#FAE900" : "#e8e4d8" },
              cursor: isActive ? "default" : "pointer",
            }}
          >
            <Typography sx={{ fontSize: "0.82rem", fontWeight: isActive ? 700 : 500, color: "#333" }}>
              {v.weight} г
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
