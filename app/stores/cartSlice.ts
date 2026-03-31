import { StateCreator } from "zustand";
import { Product } from "@/types/product";
import { Modifier } from "../entities/productId/modifiers-checkbox-list";

type MyStore = CartSlice;

export interface CartSlice {
  cart: ProductWithCartId[];
  totalCount: number;
  totalPrice: number;

  modifiers: Modifier[];
  addModifier: (modifier: Modifier) => void;
  removeModifier: (id: string) => void;
  clearModifiers: () => void;

  addProductToCart: (product: Product, cartItemId?: string) => void;
  removeProductFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

// Додаткове поле для унікального id у кошику
export interface ProductWithCartId extends Product {
  cartItemId: string;
  count: number;
  modifiers: Modifier[];
  price: number; // ціна продукту з модифікаторами
}

// 🔥 helper: порівняння модифікаторів
const isSameModifiers = (a: Modifier[] = [], b: Modifier[] = []) => {
  if (a.length !== b.length) return false;
  const normalize = (mods: Modifier[]) =>
    mods
      .map((m) => `${m._id}:${m.count ?? 1}`)
      .sort()
      .join("|");
  return normalize(a) === normalize(b);
};

// 🔥 helper: сума модифікаторів
const getModifiersPrice = (modifiers: Modifier[] = []) => {
  return modifiers.reduce(
    (sum, mod) => sum + Number(mod.price ?? 0) * (mod.count ?? 1),
    0
  );
};

// 🔥 helper: загальна ціна продукту з модифікаторами
const getItemTotalPrice = (product: Product, modifiers: Modifier[]) => {
  return Number(product.price ?? 0) + getModifiersPrice(modifiers);
};

export const createCartSlice: StateCreator<
  MyStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  CartSlice
> = (set) => ({
  cart: [],
  totalCount: 0,
  totalPrice: 0,
  modifiers: [],

  addModifier: (modifier) =>
    set(
      (state) => {
        const exists = state.modifiers.find((m) => m._id === modifier._id);
        if (exists) {
          exists.count = (exists.count ?? 1) + 1;
        } else {
          state.modifiers.push({ ...modifier, count: 1 });
        }
      },
      false,
      "cartSlice/addModifier"
    ),

  removeModifier: (id) =>
    set(
      (state) => {
        const index = state.modifiers.findIndex((m) => m._id === id);
        if (index === -1) return;
        const item = state.modifiers[index];
        if ((item.count ?? 1) > 1) {
          item.count!--;
        } else {
          state.modifiers.splice(index, 1);
        }
      },
      false,
      "cartSlice/removeModifier"
    ),

  clearModifiers: () =>
    set(
      (state) => {
        state.modifiers = [];
      },
      false,
      "cartSlice/clearModifiers"
    ),

  addProductToCart: (product) =>
    set(
      (state) => {
        const currentModifiers: Modifier[] = JSON.parse(
          JSON.stringify(state.modifiers)
        );

        if (product.cartItemId) {
          // 🔹 натиснули "+" у кошику
          const existingItem = state.cart.find(
            (item) => item.cartItemId === product.cartItemId
          );
          if (existingItem) {
            existingItem.count++;
            existingItem.price = getItemTotalPrice(
              product,
              existingItem.modifiers
            );
          }
        } else {
          // 🔹 стандартне додавання продукту
          const existingItem = state.cart.find(
            (item) =>
              item._id === product._id &&
              isSameModifiers(item.modifiers, currentModifiers)
          );

          if (existingItem) {
            existingItem.count++;
            existingItem.price = getItemTotalPrice(product, currentModifiers);
          } else {
            const newCartItemId = crypto.randomUUID();
            state.cart.push({
              ...product,
              cartItemId: newCartItemId,
              count: 1,
              modifiers: currentModifiers,
              price: getItemTotalPrice(product, currentModifiers),
            });
          }
        }

        state.modifiers = [];

        // оновлюємо totals
        state.totalCount = state.cart.reduce(
          (acc, item) => acc + (item.count ?? 1),
          0
        );
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + (item.price ?? 0) * (item.count ?? 1),
          0
        );
      },
      false,
      "cartSlice/addProduct"
    ),

  removeProductFromCart: (cartItemId) =>
    set(
      (state) => {
        const item = state.cart.find((item) => item.cartItemId === cartItemId);
        if (!item) return;

        if ((item.count ?? 1) > 1) {
          // 🔹 зменшуємо count на 1
          item.count!--;
        } else {
          // 🔹 видаляємо продукт повністю
          state.cart = state.cart.filter(
            (item) => item.cartItemId !== cartItemId
          );
        }

        state.totalCount = state.cart.reduce(
          (acc, item) => acc + (item.count ?? 1),
          0
        );
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + (item.price ?? 0) * (item.count ?? 1),
          0
        );
      },
      false,
      "cartSlice/removeProduct"
    ),

  clearCart: () =>
    set(
      (state) => {
        state.cart = [];
        state.totalCount = 0;
        state.totalPrice = 0;
        state.modifiers = [];
      },
      false,
      "cartSlice/clearCart"
    ),
});
