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
  cartProducts: ICartProduct[] | null | undefined;
  handleCartAdd: (id: number) => void;
  changeProdQtd: (id: number, qtd: number) => void;
}

export const CartProductsContext = createContext<CartContextProps | null>(null);

const CartProductsProvider = ({ children }: { children: ReactNode }) => {
  const [usedIds, setUsedIds] = useState<number[] | null>(null);
  const [cartProducts, setCartProducts] = useState<
    ICartProduct[] | null | undefined
  >(undefined);
  const [allProducts, setAllProducts] = useState<ICartProduct[] | null>(null);

  const [freeIds, setFreeIds] = useState<boolean>(false); // Prevents that usedIds add duplicated products to useState when getting products from localStorage

  const prods = useAllProductsContext();

  const quantities = {
    qtd: 0,
  };

  const setIntoCart = (id: number) => {
    if (allProducts !== null) {
      allProducts[id].qtd! += 1;
      cartProducts === null
        ? setCartProducts([allProducts[id]])
        : setCartProducts([...cartProducts!, allProducts[id]]);
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
      setUsedIds(idArr);
    } else {
      setCartProducts(null);
    }
  }, []);

  useEffect(() => {
    if (prods) {
      const qtdProds = prods.map((prod) => {
        const { description, category, rating, ...rest } = prod;
        if (Array.isArray(rest.images)) rest.images = rest.images[0];
        return Object.assign(rest, quantities);
      });
      setAllProducts(qtdProds);
    }
  }, [prods]);

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      localStorage.setItem("cartData", JSON.stringify(cartProducts));
      console.log(cartProducts);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (usedIds && freeIds) setIntoCart(usedIds[usedIds.length - 1]);
    if (!freeIds) setFreeIds(true);
  }, [usedIds]);

  const contextValue: CartContextProps = {
    cartProducts,
    handleCartAdd,
    changeProdQtd,
  };

  function findProductInArray(id: number): number | null {
    let curPos: number | undefined = usedIds?.indexOf(id);
    if (curPos !== undefined && curPos !== -1) {
      return curPos;
    } else {
      return null;
    }
  }

  function handleCartAdd(id: number) {
    const position = findProductInArray(id);
    if (position !== null && cartProducts) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[position] = {
        ...updatedCartProducts[position],
        qtd: 1 + updatedCartProducts[position].qtd,
      };
      setCartProducts(updatedCartProducts);
    } else {
      usedIds === null ? setUsedIds([id]) : setUsedIds([...usedIds!, id]);
    }
  }

  function changeProdQtd(id: number, qtd: number) {
    const position = findProductInArray(id);
    if (position !== null && cartProducts) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[position] = {
        ...updatedCartProducts[position],
        qtd: qtd,
      };
      setCartProducts(updatedCartProducts);
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
