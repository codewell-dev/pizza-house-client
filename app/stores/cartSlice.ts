import { StateCreator } from "zustand";
import { Product } from "@/types/product";
import { Modifier } from "@/types/product";

type MyStore = CartSlice;

export interface ProductWithCartId extends Product {
  cartItemId: string;
  count: number;
  modifiers: Modifier[];
  price: number;
}

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

const isSameModifiers = (a: Modifier[] = [], b: Modifier[] = []): boolean => {
  if (a.length !== b.length) return false;
  const normalize = (mods: Modifier[]) =>
    mods.map((m) => `${m._id}:${m.count ?? 1}`).sort().join("|");
  return normalize(a) === normalize(b);
};

const getModifiersPrice = (modifiers: Modifier[] = []): number =>
  modifiers.reduce((sum, mod) => sum + Number(mod.price ?? 0) * (mod.count ?? 1), 0);

const getItemTotalPrice = (product: Product, modifiers: Modifier[]): number =>
  Number(product.price ?? 0) + getModifiersPrice(modifiers);

const recalcTotals = (cart: ProductWithCartId[]) => ({
  totalCount: cart.reduce((acc, item) => acc + (item.count ?? 1), 0),
  totalPrice: cart.reduce((acc, item) => acc + (item.price ?? 0) * (item.count ?? 1), 0),
});

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
        const existing = state.modifiers.find((m) => m._id === modifier._id);
        if (existing) {
          existing.count = (existing.count ?? 1) + 1;
        } else {
          state.modifiers.push({ ...modifier, count: 1 });
        }
      },
      false,
      "cart/addModifier"
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
      "cart/removeModifier"
    ),

  clearModifiers: () =>
    set((state) => { state.modifiers = []; }, false, "cart/clearModifiers"),

  addProductToCart: (product) =>
    set(
      (state) => {
        const currentModifiers: Modifier[] = JSON.parse(JSON.stringify(state.modifiers));

        if (product.cartItemId) {
          const existing = state.cart.find((item) => item.cartItemId === product.cartItemId);
          if (existing) {
            existing.count++;
            existing.price = getItemTotalPrice(product, existing.modifiers);
          }
        } else {
          const existing = state.cart.find(
            (item) => item._id === product._id && isSameModifiers(item.modifiers, currentModifiers)
          );

          if (existing) {
            existing.count++;
            existing.price = getItemTotalPrice(product, currentModifiers);
          } else {
            state.cart.push({
              ...product,
              cartItemId: crypto.randomUUID(),
              count: 1,
              modifiers: currentModifiers,
              price: getItemTotalPrice(product, currentModifiers),
            });
          }
        }

        state.modifiers = [];
        const totals = recalcTotals(state.cart);
        state.totalCount = totals.totalCount;
        state.totalPrice = totals.totalPrice;
      },
      false,
      "cart/addProduct"
    ),

  removeProductFromCart: (cartItemId) =>
    set(
      (state) => {
        const item = state.cart.find((i) => i.cartItemId === cartItemId);
        if (!item) return;

        if ((item.count ?? 1) > 1) {
          item.count!--;
        } else {
          state.cart = state.cart.filter((i) => i.cartItemId !== cartItemId);
        }

        const totals = recalcTotals(state.cart);
        state.totalCount = totals.totalCount;
        state.totalPrice = totals.totalPrice;
      },
      false,
      "cart/removeProduct"
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
      "cart/clearCart"
    ),
});
