"use client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Product from "./components/Product";
import { IProduct } from "./interfaces/Products";
import Hero from "./components/Hero";
export default function Home() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const getAllProducts = async () => {
    try {
      await fetch("/products.json", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    } catch (e: any) {
      console.log("Error: ", e);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <main className={styles.home}>
      <Hero />
      <section className={styles.prod_area}>
        {products &&
          products.map((prod: IProduct) => (
            <Product
              key={prod.id}
              id={prod.id}
              title={prod.title}
              price={prod.price}
              discount={prod.discount}
              description={prod.description}
              category={prod.category}
              images={prod.images}
              rating={prod.rating}
            />
          ))}
      </section>
    </main>
  );
}
