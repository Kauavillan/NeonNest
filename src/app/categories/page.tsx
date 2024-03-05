"use client";
import styles from "../../styles/Categories.module.scss";
import Product from "../components/Product";
import { useAllProductsContext } from "../contexts/AllProductsContext";
import Loading from "../items/Loading";
export default function Categories() {
  const allProducts = useAllProductsContext();

  return (
    <div className={styles.container}>
      {allProducts ? (
        <>
          <h1>All products</h1>
          <div className={styles.prodArea}>
            {allProducts?.map((prod) => (
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
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
