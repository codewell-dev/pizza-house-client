import { Metadata } from "next";
import { Container, Grid } from "@mui/material";
import CardProduct from "@/app/entities/components/card-product";
import { getCategoryById } from "@/lib/api";
import { Product } from "@/types/product";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Категорія: ${id}` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const response = await getCategoryById(id);
  const products: Product[] = response?.pageProps?.category?.category_products ?? [];

  if (products.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <p>Немає продуктів у цій категорії.</p>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        {products.map((product: Product) => (
          <Grid key={product._id ?? product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CardProduct product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
