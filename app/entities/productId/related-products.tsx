import CardRelated from "@/app/entities/productId/card-related";
import { Box, Typography } from "@mui/material";
import { RelatedProduct } from "@/types/product";
import { getTranslations } from "next-intl/server";

interface Props {
  products: RelatedProduct[];
}

export default async function RelatedProducts({ products }: Props) {
  if (!products?.length) return null;
  const t = await getTranslations("product");

  return (
    <>
      <Typography variant="h4" mt={5}>
        {t("relatedTitle")}
      </Typography>
      <Box display="flex" gap={5} mt={2} flexWrap="wrap">
        {products.map((product) => (
          <CardRelated key={product.id ?? product._id} product={product} />
        ))}
      </Box>
    </>
  );
}
