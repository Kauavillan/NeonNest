"use client";
import { IProduct } from "@/app/interfaces/Products";
import Images from "@/app/items/Images";
import { useState, useEffect } from "react";
import styles from "../../../styles/InnerProduct.module.scss";
import Buy from "@/app/items/Buy";
import { useAllProductsContext } from "@/app/contexts/AllProductsContext";
export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const prods = useAllProductsContext();
  useEffect(() => {
    if (prods) {
      setProduct(prods[Number(params.id)]);
      setActive(true);
    }
  }, [prods]);
  return (
    <div className={styles.main}>
      <div className={styles.buy}>
        {product && <Images images={product.images} />}
        <div className={styles.prodMain}>
          {product && (
            <Buy
              id={product.id}
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
