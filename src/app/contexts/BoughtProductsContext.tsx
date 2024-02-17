import { useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/Products";
import { createContext } from "react";
import { useAllProductsContext } from "./AllProductsContext";
import { usePathname } from "next/navigation";
type prductType = IProduct[] | null | undefined;
interface BoughtProductsContextProps {
  boughtProducts: prductType;
  justBoughtProducts: IProduct[] | null;
  addJustBoughtProducts: (ids: number[]) => void;
}

export const BoughtProductsContext = createContext<
  BoughtProductsContextProps | null | undefined
>(null);

export default function BoughtProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prods = useAllProductsContext();
  const [allProducts, setAllProducts] = useState<IProduct[] | null>(null);
  const [boughtProducts, setBoughtProducts] = useState<prductType>(undefined);
  const [justBoughtProducts, setJustBoughtProducts] = useState<
    IProduct[] | null
  >(null);

  const pathName = usePathname();

  useEffect(() => {
    const prevBoughtProds = localStorage.getItem("boughtProds");
    if (prevBoughtProds) {
      setBoughtProducts(JSON.parse(prevBoughtProds));
    } else setBoughtProducts(null);
  }, []);

  useEffect(() => {
    if (prods) {
      setAllProducts(prods);
    }
  }, [prods]);

  useEffect(() => {
    if (boughtProducts) {
      localStorage.setItem("boughtProds", JSON.stringify(boughtProducts));
    }
  }, [boughtProducts]);

  useEffect(() => {
    if (justBoughtProducts && justBoughtProducts.length > 0) {
      setBoughtProducts((prevBoughtProducts) => {
        if (!prevBoughtProducts) {
          return justBoughtProducts;
        } else {
          const different = justBoughtProducts.filter(
            (justbProd) =>
              !prevBoughtProducts.some((bprod) => bprod.id === justbProd.id)
          );
          const allBoughtProducts = [...prevBoughtProducts, ...different];
          return allBoughtProducts;
        }
      });
    }
  }, [justBoughtProducts]);

  function findProductInArray(id: number): number | null {
    if (boughtProducts) {
      for (let i = 0; i < boughtProducts?.length; i++) {
        if (boughtProducts[i].id === id) return i;
      }
    }
    return null;
  }

  function addJustBoughtProducts(ids: number[]): void {
    const allJustBought: IProduct[] = [];
    ids.forEach((id) => {
      if (allProducts) {
        for (let i = 0; i < allProducts?.length; i++) {
          if (allProducts[i].id === id) {
            allJustBought.push(allProducts[i]);
            break;
          }
        }
      }
    });
    setJustBoughtProducts(allJustBought);
  }

  const contextValue: BoughtProductsContextProps = {
    boughtProducts,
    justBoughtProducts,
    addJustBoughtProducts,
  };

  return (
    <BoughtProductsContext.Provider value={contextValue}>
      {children}
    </BoughtProductsContext.Provider>
  );
}

export function useBoughtProductsContext() {
  const context = useContext(BoughtProductsContext);
  if (!context) {
    throw new Error(
      "useBoughtProductsContext must be used within a BoughtProductsProvider"
    );
  }
  return context;
}
