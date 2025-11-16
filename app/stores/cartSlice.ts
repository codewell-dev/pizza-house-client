import { StateCreator } from "zustand"
import { Product } from "@/types/product";
import { Modifier } from "../entities/productId/modifiers-checkbox-list"; 

type MyStore = CartSlice;

export interface CartSlice {
    cart: Product[];
    totalCount: number;
    totalPrice: number;

    modifiers: Modifier[];
    addModifier: (modifier: Modifier) => void;
    removeModifier: (id: string) => void;
    clearModifiers: () => void;

    addProductToCart: (product: Product) => void;
    removeProductFromCart: (id: number) => void;
    clearCart: () => void;
}

export const createCartSlice: StateCreator<
    MyStore,
    [
        ['zustand/immer', never],
        ['zustand/devtools', never],
    ],
    [],
    CartSlice
> = (set) => ({
    cart: [],
    totalCount: 0,
    totalPrice: 0,

    modifiers: [],
    
    addModifier: (modifier) => set((state) => {
        const exists = state.modifiers.find(m => m._id === modifier._id); 
        
        if (exists) {
            exists.count = (exists.count ?? 1) + 1;
        } else {
            state.modifiers.push({ ...modifier, count: 1 }); 
        }
    }, false, 'cartSlice/addModifier'),

    removeModifier: (id) => set((state) => {
        const index = state.modifiers.findIndex(m => m._id === id); 

        if (index !== -1) {
            const item = state.modifiers[index];
            
            if ((item.count ?? 1) > 1) {
                item.count!--;
            } else {
                state.modifiers.splice(index, 1);
            }
        }
    }, false, 'cartSlice/removeModifier'),

    clearModifiers: () => set((state) => {
        state.modifiers = [];
    }, false, 'cartSlice/clearModifiers'),

    addProductToCart: (product) => set((state) => {
        
        // Додаємо новий елемент до кошика з поточно обраними модифікаторами
        state.cart.push({ 
            ...product, 
            modifiers: JSON.parse(JSON.stringify(state.modifiers)), 
            count: 1 
        });

        // Очищаємо поточні модифікатори для наступного продукту
        state.modifiers = []; 

        // Оновлення лічильників
        state.totalCount = state.cart.reduce((acc, item) => acc + (item.count ?? 1), 0);
        state.totalPrice = state.cart.reduce((acc, item) => {
            const modifiersPrice = (item.modifiers || []).reduce((sum, mod) => sum + mod.price * (mod.count || 1), 0);
            return acc + (item.price + modifiersPrice) * (item.count ?? 1);
        }, 0);
    }, false, 'cartSlice/addProduct'),

    removeProductFromCart: (id) =>
        set((state) => {
            const productFromCart = state.cart.find((i: Product) => i.id === id);
            if (!productFromCart) return;

            if ((productFromCart.count ?? 1) > 1) {
                productFromCart.count!--;
            } else {
                state.cart = state.cart.filter((item) => item.id !== id);
            }
            
            // Оновлення лічильників
            state.totalCount = state.cart.reduce((acc, item) => acc + (item.count ?? 1), 0);
            state.totalPrice = state.cart.reduce((acc, item) => {
                const modifiersPrice = (item.modifiers || []).reduce((sum, mod) => sum + mod.price * (mod.count || 1), 0);
                return acc + (item.price + modifiersPrice) * (item.count ?? 1);
            }, 0);
        }, false, 'cartSlice/removeProduct'),

    clearCart: () => set((state) => {
        state.cart = [];
        state.totalCount = 0;
        state.totalPrice = 0;
        state.modifiers = []; 
    }, false, 'cartSlice/clearCart'),
});