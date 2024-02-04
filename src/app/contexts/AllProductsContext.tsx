"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct } from "../interfaces/Products";

export const AllProducts = createContext<IProduct[] | null>(null);

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [allProducts, setAllProducts] = useState<IProduct[] | null>(null);

  const getAllProducts = async () => {
    try {
      await fetch("/products.json", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
        });
    } catch (e: any) {
      return setAllProducts(null);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AllProducts.Provider value={allProducts}>{children}</AllProducts.Provider>
  );
};
export default ProductsProvider;
export function useAllProductsContext() {
  return useContext(AllProducts);
}
