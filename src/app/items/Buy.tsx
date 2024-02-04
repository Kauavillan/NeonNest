"use client";
import styles from "../../styles/Buy.module.scss";
import Button from "./Button";

//Icons
import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import Shipment from "./Shipment";
interface Props {
  id: number;
  title: string;
  price: number;
  discount?: number;
}
export default function Buy({ id, title, price, discount }: Props) {
  if (discount) {
    var afterPrice: number = Number(price) - (Number(price) * discount) / 100;
    afterPrice = Number(afterPrice.toFixed(2));
  } else {
    var afterPrice = 0;
  }
  return (
    <div className={styles.buy}>
      <h1>{title}</h1>
      <div className={styles.price}>
        {discount ? (
          <>
            <span id={styles.discount}>From {price} to:</span>
            <span id={styles.price}>${afterPrice}</span>
          </>
        ) : (
          <span id={styles.price}>${price}</span>
        )}
      </div>
      <div className={styles.buttons}>
        <Button text="Buy Now" Icon={FaCartShopping} color={"blue"} />
        <Button id={id} text="Add to Cart" Icon={FaCartPlus} color={"pink"} />
      </div>
      <Shipment />
    </div>
  );
}
