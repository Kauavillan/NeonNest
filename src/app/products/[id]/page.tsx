"use client";
import { IProduct } from "@/app/interfaces/Products";
import Images from "@/app/items/Images";
import { useState, useEffect } from "react";
import styles from "../../../styles/InnerProduct.module.scss";
import Buy from "@/app/items/Buy";
import { useAllProductsContext } from "@/app/contexts/AllProductsContext";
import Link from "next/link";
import Image from "next/image";
export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null | undefined>(null);
  const prods = useAllProductsContext();
  useEffect(() => {
    if (prods) {
      setProduct(prods[Number(params.id)]);
    }
  }, [prods]);

  return (
    <div>
      {product !== undefined ? (
        <>
          {product ? (
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${product?.description}`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={styles.loading}>
              <p>Loading...</p>
              <Image
                src="/images/loading_product.svg"
                width={150}
                height={150}
                alt="Loading gif"
              />
            </div>
          )}
        </>
      ) : (
        <div className={styles.notFound}>
          <p>
            Are you lost, pal? There's nothing to see here. Stand back before
            it's too late!
          </p>
          <Image
            src="/images/police_404.gif"
            width={400}
            height={300}
            alt="police gif"
          />
        </div>
      )}
    </div>
  );
}
