"use client";
import Link from "next/link";
import Button from "../items/Button";
import styles from "../../styles/Finished.module.scss";
import { useBoughtProductsContext } from "../contexts/BoughtProductsContext";
import { useEffect } from "react";
import Product from "../components/Product";
export default function Finished() {
  const { justBoughtProducts } = useBoughtProductsContext();
  useEffect(() => {
    console.log(justBoughtProducts);
  }, [justBoughtProducts]);
  return (
    <div className={styles.finished}>
      <h1>Perfect! Your purchase is already being processed.</h1>
      <p>
        We will notify you in about 200 years about the paying method, but you
        can be sure that your orders will arrive at the expected time.
      </p>
      <p>
        Use the waiting time to keep shopping! Continue shopping and be even
        more ready to the future.
      </p>
      <Link href={"/#products"}>Back to home</Link>
      <h3>What you bought</h3>
      <div className={styles.prodArea}>
        {justBoughtProducts &&
          justBoughtProducts.map((prod) => (
            <Product
              id={prod.id}
              title={prod.title}
              price={prod.price}
              discount={prod.discount}
              discountedPrice={prod.discountedPrice}
              images={prod.images}
              description={prod.description}
              category={prod.category}
            />
          ))}
      </div>
    </div>
  );
}
