"use client";
import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";

import { IProduct } from "../interfaces/Products";
import { useAllProductsContext } from "./AllProductsContext";

interface CartContextProps {
  cartProducts: IProduct[] | null;
  handleCartClick: (id: number) => void;
}

export const CartProductsContext = createContext<CartContextProps | null>(null);

const CartProductsProvider = ({ children }: { children: ReactNode }) => {
  const [usedIds, setusedIds] = useState<number[] | null>(null);
  const [cartProducts, setCartProducts] = useState<IProduct[] | null>(null);

  const [allProducts, setAllProducts] = useState<IProduct[] | null>(null);
  const prods = useAllProductsContext();

  useEffect(() => {
    setAllProducts(prods);
  }, [prods]);
  const setIntoCart = (id: number) => {
    if (allProducts !== null) {
      allProducts[id].qtd! += 1;
      cartProducts === null
        ? setCartProducts([allProducts[id]])
        : setCartProducts([...cartProducts, allProducts[id]]);
    }
  };

  useEffect(() => {
    if (usedIds) setIntoCart(usedIds[usedIds.length - 1]);
  }, [usedIds]);

  const contextValue: CartContextProps = {
    cartProducts,
    handleCartClick,
  };

  function handleCartClick(id: number) {
    let curPos: number | undefined = usedIds?.indexOf(id);
    if (curPos !== undefined && curPos !== -1) {
      if (cartProducts !== null) {
        cartProducts[curPos].qtd! += 1;
      }
    } else {
      usedIds === null ? setusedIds([id]) : setusedIds([...usedIds!, id]);
    }
  }
  return (
    <CartProductsContext.Provider value={contextValue}>
      {children}
    </CartProductsContext.Provider>
  );
};

export default CartProductsProvider;

export function useCartProductsContext() {
  const context = useContext(CartProductsContext);
  if (!context) {
    throw new Error(
      "useCartProductsContext must be used within a CartProductsProvider"
    );
  }
  return context;
}
