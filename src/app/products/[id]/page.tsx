"use client";
import { IProduct } from "@/app/interfaces/Products";
import Images from "@/app/items/Images";
import { useState, useEffect } from "react";
import styles from "../../../styles/InnerProduct.module.scss";
import Buy from "@/app/items/Buy";
export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const getProduct = async () => {
    try {
      await fetch("/products.json", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setProduct(data[params.id]);
        });
    } catch (e: any) {
      console.log("Error: ", e);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.buy}>
        {product && <Images images={product.images} />}

        <div className={styles.prodMain}>
          {product && (
            <Buy
              title={product.title}
              price={product.price}
              discount={product.discount}
            />
          )}
        </div>
      </div>
      <div className={styles.desc}>
        <h3>Description:</h3>
        <div dangerouslySetInnerHTML={{ __html: `${product?.description}` }} />
      </div>
    </div>
  );
}
