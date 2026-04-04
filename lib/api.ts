import "server-only";
import { config } from "@/app/config";
import { Product, Category, Pizza } from "@/types/product";

// Centralized fetch wrapper with error handling and caching
async function apiFetch<T>(path: string, revalidate = 60): Promise<T> {
  const url = `${config.url}${path}`;
  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getPizzas(): Promise<Pizza[]> {
  return apiFetch<Pizza[]>("/products/grouped", 60);
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories", 3600); // categories change rarely
}

export async function getPizzaById(id: string): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, 300);
}

export async function getCategoryById(id: string): Promise<{ pageProps: { category: { category_products: Product[] } } }> {
  return apiFetch(`/${id}`, 300);
}
