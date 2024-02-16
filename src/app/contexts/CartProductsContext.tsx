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
  removeOneProduct: (id: number) => void;
  removeAllProducts: () => void;
}

export const CartProductsContext = createContext<CartContextProps | null>(null);

const CartProductsProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<
    ICartProduct[] | null | undefined
  >(undefined);
  const [allProducts, setAllProducts] = useState<ICartProduct[] | null>(null);

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
    if (prevData) {
      setCartProducts(JSON.parse(prevData));
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
    }
  }, [cartProducts]);

  const contextValue: CartContextProps = {
    cartProducts,
    handleCartAdd,
    changeProdQtd,
    removeOneProduct,
    removeAllProducts,
  };

  function findProductInArray(id: number): number | null {
    if (cartProducts) {
      for (let i = 0; i < cartProducts?.length; i++) {
        if (cartProducts[i].id === id) return i;
      }
    }
    return null;
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
      if (allProducts) {
        for (let i = 0; i < allProducts?.length; i++) {
          if (allProducts[i].id === id) {
            setIntoCart(i);
            break;
          }
        }
      }
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

  function removeAllProducts() {
    setCartProducts(null);
    localStorage.removeItem("cartData");
  }

  function removeOneProduct(id: number) {
    const position = findProductInArray(id);
    if (position !== null && cartProducts) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts.splice(position, 1);

      updatedCartProducts.length === 0
        ? removeAllProducts()
        : setCartProducts(updatedCartProducts);
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
