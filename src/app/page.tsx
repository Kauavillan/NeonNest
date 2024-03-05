"use client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Product from "./components/Product";
import { IProduct } from "./interfaces/Products";
import Hero from "./components/Hero";

import { useAllProductsContext } from "./contexts/AllProductsContext";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  const prods = useAllProductsContext();
  const [products, setProducts] = useState<IProduct[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setProducts(prods);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [prods]);
  return (
    <main className={styles.home}>
      <Hero />
      <section className={styles.prod_area} id="products">
        {!loading ? (
          products?.map((prod: IProduct) => (
            <Product
              key={prod.id}
              id={prod.id}
              title={prod.title}
              price={prod.price}
              discount={prod.discount}
              discountedPrice={prod.discountedPrice}
              description={prod.description}
              categories={prod.categories}
              images={prod.images}
            />
          ))
        ) : (
          <div className={styles.skeleton}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton count={20} className={styles.skelProd} />
            </SkeletonTheme>
          </div>
        )}
      </section>
    </main>
  );
}
