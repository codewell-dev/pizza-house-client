import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CartSlice, createCartSlice } from "./cartSlice";
import { AuthSlice, createAuthSlice } from "./authSlice";

type MyStore = CartSlice & AuthSlice;

export const createShopStore = () =>
  createStore<MyStore>()(
    immer(
      devtools(
        persist(
          (set, get, api) => ({
            ...createCartSlice(set, get, api),
            ...createAuthSlice(set, get, api),
          }),
          {
            name: "shop-storage",
            // Only persist cart and auth token — not UI state
            partialize: (state) => ({
              cart: state.cart,
              totalCount: state.totalCount,
              totalPrice: state.totalPrice,
              token: state.token,
              user: state.user,
              isAuthenticated: state.isAuthenticated,
            }),
          }
        )
      )
    )
  );
