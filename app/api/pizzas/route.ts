import { config } from "@/app/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${config.url}/products/grouped`);

    if (!res.ok) {
      throw new Error("Помилка при завантаженні даних");
    }

    const data = await res.json();
    return NextResponse.json({
      pizzas: data
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Помилка" },
      { status: 500 }
    );
  }
}
