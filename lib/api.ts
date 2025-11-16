import { config } from "@/app/config";
import "server-only";

export async function getPizzaId(id: string) {
  const res = await fetch(config.url + `/products/${id}`);

  return res.json();
}

export async function getCategoryId(id: string) {
  const res = await fetch(config.url + `${id}.json`);

  return res.json();
}

