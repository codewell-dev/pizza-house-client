import CardRelated from "@/app/entities/productId/card-related";
import { Box, Typography } from "@mui/material";
import { RelatedProduct } from "@/types/product";

interface Props {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: Props) {
  if (!products?.length) return null;

  return (
    <>
      <Typography variant="h4" mt={5}>Часто замовляють з</Typography>
      <Box display="flex" gap={5} mt={2} flexWrap="wrap">
        {products.map((product) => (
          <CardRelated key={product.id ?? product._id} product={product} />
        ))}
      </Box>
    </>
  );
}
