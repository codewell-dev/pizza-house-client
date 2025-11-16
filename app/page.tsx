import { Container, Grid } from "@mui/material";
import Categories from "./widgets/categories";
import Carousel from "./widgets/carousel";
import PizzaCard from "./entities/pizza/pizza-card";

interface Pizza {
  _id: string;
  title: string;
  image: { large: string };
  products: any[];
}

interface PizzaResponse {
  pizzas: Pizza[];
}

interface CategoriesResponse {
  categories: string[];
}

interface ItemsResponse {
  categories: string[];
  pizzas: Pizza[];
}

async function getPizzas(): Promise<ItemsResponse> {
  const [pizzasRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pizzas`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: "no-store" }),
  ]);

  if (!pizzasRes.ok || !categoriesRes.ok) {
    throw new Error("Не вдалося завантажити піци або категорії");
  }

  const [{ pizzas }, { categories }]: [PizzaResponse, CategoriesResponse] =
    await Promise.all([pizzasRes.json(), categoriesRes.json()]);

  return { pizzas, categories };
}

export default async function Home() {
  const { pizzas, categories } = await getPizzas();
  if (!pizzas) {
    return null
  }
  return (
    <div className="mx-auto">
      {/* Категорії */}
      {/* <div className="mb-4">
        <Categories categories={categories} />
      </div> */}

      {/* Слайдер */}
      <div className="mb-8">
        <Carousel />
      </div>

      {/* Сітка піц */}
      <Container maxWidth="xl">
        <Grid container spacing={3} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {(pizzas ?? [])
            .filter((pizza) => pizza?.products?.length > 0) // <-- ключовий момент
            .map((pizza) => (
              <Grid
                key={pizza._id}
               size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: "flex" }}
              >
                <PizzaCard title={pizza.title} products={pizza.products} />
              </Grid>
            ))}
        </Grid>
      </Container>

    </div>
  );
}
