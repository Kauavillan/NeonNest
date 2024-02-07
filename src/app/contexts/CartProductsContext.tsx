"use client";
import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";

import { useAllProductsContext } from "./AllProductsContext";
import { ICartProduct } from "../interfaces/CartProducts";

interface CartContextProps {
  cartProducts: ICartProduct[] | null;
  handleCartAdd: (id: number) => void;
}

export const CartProductsContext = createContext<CartContextProps | null>(null);

const CartProductsProvider = ({ children }: { children: ReactNode }) => {
  const [usedIds, setusedIds] = useState<number[] | null>(null);
  const [cartProducts, setCartProducts] = useState<ICartProduct[] | null>(null);
  const [allProducts, setAllProducts] = useState<ICartProduct[] | null>(null);
  const [freeIds, setFreeIds] = useState<boolean>(false);

  const prods = useAllProductsContext();

  const quantities = {
    qtd: 0,
  };

  const setIntoCart = (id: number) => {
    if (allProducts !== null) {
      allProducts[id].qtd! += 1;
      cartProducts === null
        ? setCartProducts([allProducts[id]])
        : setCartProducts([...cartProducts, allProducts[id]]);
    }
  };

  useEffect(() => {
    const prevData = localStorage.getItem("cartData");
    let idArr: number[] = [];
    if (prevData) {
      setCartProducts(JSON.parse(prevData));
      JSON.parse(prevData).forEach((e: ICartProduct) => {
        idArr.push(e.id);
      });
      setusedIds(idArr);
    }
  }, []);

  useEffect(() => {
    if (prods) {
      const qtdProds = prods.map((prod) => {
        const { description, category, rating, ...rest } = prod;
        rest.images = rest.images[0];
        return Object.assign(rest, quantities);
      });
      setAllProducts(qtdProds);
    }
  }, [prods]);

  useEffect(() => {
    if (cartProducts !== null && cartProducts.length > 0) {
      localStorage.setItem("cartData", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    console.log(usedIds);
    if (usedIds && freeIds) setIntoCart(usedIds[usedIds.length - 1]);
    if (!freeIds) setFreeIds(true);
  }, [usedIds]);

  const contextValue: CartContextProps = {
    cartProducts,
    handleCartAdd,
  };

  function handleCartAdd(id: number) {
    let curPos: number | undefined = usedIds?.indexOf(id);
    if (curPos !== undefined && curPos !== -1) {
      if (cartProducts !== null) {
        console.log(usedIds);
        console.log(curPos);
        cartProducts[curPos].qtd! += 1;
        console.log(cartProducts[curPos]);
        localStorage.setItem("cartData", JSON.stringify(cartProducts));
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
