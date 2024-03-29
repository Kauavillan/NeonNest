"use client";
import styles from "../../styles/Buy.module.scss";
import Button from "./Button";
//Icons
import { FaCartPlus } from "react-icons/fa6";
import Shipment from "./Shipment";
import BuyNowButton from "./BuyNowButton";
interface Props {
  id: number;
  title: string;
  price: number;
  discount?: number;
  discountedPrice?: string | number;
}
export default function Buy({
  id,
  title,
  price,
  discount,
  discountedPrice,
}: Props) {
  return (
    <div className={styles.buy}>
      <h1>{title}</h1>
      <div className={styles.price}>
        {discount ? (
          <>
            <span id={styles.discount}>From {price.toFixed(2)} to:</span>
            <span id={styles.price}>${discountedPrice}</span>
          </>
        ) : (
          <span id={styles.price}>${price.toFixed(2)}</span>
        )}
      </div>
      <div className={styles.buttons}>
        <BuyNowButton text="Buy Now" color="blue" addIds={[id]} />

        <Button id={id} text="Add to Cart" Icon={FaCartPlus} color={"pink"} />
      </div>
      <Shipment />
    </div>
  );
}
