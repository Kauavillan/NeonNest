"use client";
import { IProduct } from "@/app/interfaces/Products";
import Images from "@/app/items/Images";
import { useState, useEffect } from "react";
import styles from "../../../styles/InnerProduct.module.scss";
import Buy from "@/app/items/Buy";
import { useAllProductsContext } from "@/app/contexts/AllProductsContext";
import Image from "next/image";
import Loading from "@/app/items/Loading";
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
                {typeof product.images === "string" ? (
                  <Images images={[product.images]} />
                ) : (
                  <Images images={product.images} />
                )}

                <div className={styles.prodMain}>
                  <Buy
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    discountedPrice={product.discountedPrice}
                    discount={product.discount}
                  />
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
            <Loading />
          )}
        </>
      ) : (
        <div className={styles.notFound}>
          <p>
            Are you lost, pal? There's nothing to see here. Stand back before
            it's too late!
          </p>
          <Image
            src="/assets/images/police_404.gif"
            width={400}
            height={300}
            alt="police gif"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
