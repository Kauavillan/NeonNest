import Image from "next/image";
import { IProduct } from "../interfaces/Products";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Product({
  id,
  title,
  price,
  discount,
  images,
  discountedPrice,
}: IProduct) {
  return (
    <Link href={`/products/${id}`} className={styles.prodContainer}>
      <div key={id} className={styles.prod}>
        <div className={styles.imgDiv}>
          {(
            <Image
              src={images[0]}
              width={500}
              height={500}
              alt={`${title} thumbnail`}
              loading="lazy"
            />
          ) || (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton className={styles.skeletonImg} />
            </SkeletonTheme>
          )}
        </div>
        <div className={styles.descDiv}>
          <h3>{title}</h3>
          <div className={styles.price}>
            {discount ? (
              <>
                <span>${price.toFixed(2)}</span>
                <div>
                  <p>${discountedPrice}</p>
                  <span> {discount}% off</span>
                </div>
              </>
            ) : (
              <p>${price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
