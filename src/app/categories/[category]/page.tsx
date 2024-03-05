"use client";
import { useEffect, useState } from "react";
import styles from "../../../styles/Categories.module.scss";
import { useAllProductsContext } from "@/app/contexts/AllProductsContext";
import { IProduct } from "@/app/interfaces/Products";
import Product from "@/app/components/Product";
export default function Category({ params }: { params: { category: string } }) {
  const [categoryProds, setCategoryProds] = useState<IProduct[] | null>(null);
  const [title, setTitle] = useState(decodeURIComponent(params.category)); // Decodes the url text, so spaces and special characters are decoded
  const products = useAllProductsContext();

  useEffect(() => {
    const prodsList: IProduct[] = [];

    if (products) {
      const decodedParam = decodeURIComponent(params.category);
      products.forEach((prod) => {
        for (let i = 0; i < prod.categories.length; i++) {
          if (prod.categories[i] === decodedParam) prodsList.push(prod);
        }
      });
      if (prodsList) {
        setCategoryProds(prodsList);
        console.log(prodsList);
      }
    }
  }, [products]);
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.prodArea}>
        {categoryProds &&
          categoryProds?.map((prod) => (
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
    </div>
  );
}
