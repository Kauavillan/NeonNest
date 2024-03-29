import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAllProductsContext } from "../contexts/AllProductsContext";
import { IProduct } from "../interfaces/Products";
import Link from "next/link";
import styles from "../../styles/CategoriesList.module.scss";
import Loading from "./Loading";
export default function CategoriesList({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [categoriesList, setCategoresList] = useState<string[]>();

  const allProducts = useAllProductsContext();
  useEffect(() => {
    if (allProducts) {
      const uniqueCategories = allProducts.reduce(
        (categories: Set<string>, curObj: IProduct) => {
          curObj.categories.forEach((categorie) => {
            categories.add(categorie);
          });
          return categories;
        },
        new Set<string>()
      );
      const categoriesArray = Array.from(uniqueCategories);
      setCategoresList(categoriesArray);
    }
  }, [allProducts]);

  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : styles.invisible
      }`}
    >
      <div className={styles.list}>
        {categoriesList ? (
          <ul>
            <li>
              <span>
                <Link href="/categories" onClick={() => setVisible(false)}>
                  All categories
                </Link>
              </span>
            </li>
            {categoriesList.map((categorie, i) => (
              <li key={i}>
                <Link
                  href={`/categories/${categorie}`}
                  onClick={() => setVisible(false)}
                >
                  {categorie}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          visible && <Loading />
        )}
      </div>
    </div>
  );
}
