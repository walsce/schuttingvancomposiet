import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  sessionId: string;
  trackCheckoutStarted: (email: string) => void;
  trackOrderCompleted: (email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "svc-cart";
const SESSION_KEY = "svc-session-id";

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const sessionId = useRef(getSessionId()).current;
  const trackTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Debounced cart tracking
  useEffect(() => {
    if (trackTimer.current) clearTimeout(trackTimer.current);
    trackTimer.current = setTimeout(() => {
      if (items.length === 0) return;
      const cartData = items.map((i) => ({
        product_id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      }));
      // Fire and forget
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ session_id: sessionId, cart_data: cartData }),
        }
      ).catch(() => {});
    }, 5000);

    return () => {
      if (trackTimer.current) clearTimeout(trackTimer.current);
    };
  }, [items, sessionId]);

  const trackCheckoutStarted = useCallback(
    (email: string) => {
      const cartData = items.map((i) => ({
        product_id: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      }));
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            session_id: sessionId,
            cart_data: cartData,
            email,
            checkout_started: true,
          }),
        }
      ).catch(() => {});
    },
    [items, sessionId]
  );

  const trackOrderCompleted = useCallback(
    (email: string) => {
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            session_id: sessionId,
            email,
            order_completed: true,
          }),
        }
      ).catch(() => {});
    },
    [sessionId]
  );

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shippingCost = subtotal >= 500 ? 0 : 49.95;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQuantity, clearCart,
        totalItems, subtotal, shippingCost, total,
        sessionId, trackCheckoutStarted, trackOrderCompleted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
