import { useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/Products";
import { createContext } from "react";
import { useAllProductsContext } from "./AllProductsContext";
import { usePathname } from "next/navigation";
type prductType = IProduct[] | null | undefined;
interface BoughtProductsContextProps {
  boughtProducts: prductType;
  justBoughtProducts: IProduct[] | null | undefined;
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
    IProduct[] | null | undefined
  >(undefined);

  const pathName = usePathname();

  useEffect(() => {
    const prevBoughtProds = localStorage.getItem("boughtProds");
    const prevJustBoughtProds = sessionStorage.getItem("justBought");
    if (prevBoughtProds) {
      setBoughtProducts(JSON.parse(prevBoughtProds));
    } else setBoughtProducts(null);
    if (prevJustBoughtProds) {
      setJustBoughtProducts(JSON.parse(prevJustBoughtProds));
    } else setJustBoughtProducts(null);
  }, []);

  useEffect(() => {
    if (pathName !== "/finished" && justBoughtProducts) {
      setJustBoughtProducts(null);
      sessionStorage.removeItem("justBought");
    }
  }, [pathName]);

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
      sessionStorage.setItem("justBought", JSON.stringify(justBoughtProducts));
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
