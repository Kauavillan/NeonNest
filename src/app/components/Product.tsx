import Image from "next/image";
import { IProduct } from "../interfaces/Products";
import styles from "../../styles/Product.module.scss";
import Link from "next/link";
export default function Product({
  id,
  title,
  price,
  discount,
  images,
}: IProduct) {
  if (discount) {
    var afterPrice: number = Number(price) - (Number(price) * discount) / 100;
    afterPrice = Number(afterPrice.toFixed(2));
  } else {
    var afterPrice = 0;
  }
  return (
    <Link href={`../products/${id}`} className={styles.prodContainer}>
      <div key={id} className={styles.prod}>
        <div className={styles.imgDiv}>
          <Image src={images[0]} width={500} height={500} alt="Product image" />
        </div>
        <div className={styles.descDiv}>
          <h3>{title}</h3>
          <div className={styles.price}>
            {discount ? (
              <>
                <span>${price}</span>
                <div>
                  <p>${afterPrice}</p>
                  <span> {discount}% off</span>
                </div>
              </>
            ) : (
              <p>${price}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
