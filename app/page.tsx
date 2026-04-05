import { Suspense } from "react";
import { Container, Grid } from "@mui/material";
import Categories from "./widgets/categories";
import Carousel from "./widgets/carousel";
import PizzaCard from "./entities/pizza/pizza-card";
import PizzaCardSkeleton from "./entities/pizza/pizza-card-skeleton";
import { getPizzas, getCategories } from "@/lib/api";
import { Pizza } from "@/types/product";

// Parallel data fetching at the top level - no intermediate API routes needed
async function getData() {
  const [pizzas, categories] = await Promise.all([
    getPizzas(),
    getCategories(),
  ]);
  return { pizzas, categories };
}

export default async function HomePage() {
  const { pizzas, categories } = await getData();

  const visiblePizzas = (pizzas ?? []).filter(
    (pizza: Pizza) => pizza?.products?.length > 0
  );

  return (
    <div className="mx-auto">
      <div className="my-8">
        <Carousel />
      </div>

      <Container maxWidth="xl">
        <Suspense
          fallback={
            <Grid container spacing={3}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid
                  key={i}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  sx={{ display: "flex" }}
                >
                  <PizzaCardSkeleton />
                </Grid>
              ))}
            </Grid>
          }
        >
          <Grid
            container
            spacing={3}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
            {visiblePizzas.map((pizza: Pizza) => (
              <Grid
                key={pizza._id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: "flex" }}
              >
                <PizzaCard title={pizza.title} products={pizza.products} />
              </Grid>
            ))}
          </Grid>
        </Suspense>
      </Container>
    </div>
  );
}
