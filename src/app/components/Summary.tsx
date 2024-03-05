import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import { useShipmentContext } from "../contexts/ShipmentContext";
import { ICartProduct } from "../interfaces/CartProducts";
import BuyNowButton from "../items/BuyNowButton";

interface Props {
  cartProducts: ICartProduct[];
}

export default function Summary({ cartProducts }: Props) {
  const shipmentTotalData = useShipmentContext();

  const [ids, setIds] = useState<number[] | null>(null);

  function getProductIds() {
    const currentIdsArr: number[] = [];
    cartProducts?.forEach((prod) => {
      currentIdsArr.push(prod.id);
    });
    setIds(currentIdsArr);
  }

  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (shipmentTotalData?.shipmentData?.price)
      setTotalPrice(totalPrice + shipmentTotalData.shipmentData?.price);
  }, [shipmentTotalData!.shipmentData?.price]);

  useEffect(() => {
    if (cartProducts) {
      const finalPrice: number = cartProducts.reduce(
        (accumulator: number, currentProduct: ICartProduct) => {
          if (currentProduct.discountedPrice) {
            return (
              accumulator +
              Number(currentProduct.discountedPrice) * currentProduct.qtd
            );
          }
          return (
            accumulator + Number(currentProduct.price) * currentProduct.qtd
          );
        },
        0
      );
      setTotalPrice(finalPrice);
      getProductIds();
    }
  }, [cartProducts]);
  return (
    <div className={styles.summary}>
      <h3>Summary</h3>
      {cartProducts.map((product, i) => {
        return (
          <div className={styles.details} key={i}>
            <div>
              <span>{product.qtd} x</span> {product.title}
            </div>
            <span>
              Prod. final price: $
              {product.discount
                ? (Number(product.discountedPrice) * product.qtd).toFixed(2)
                : (Number(product.price) * product.qtd).toFixed(2)}
            </span>
          </div>
        );
      })}
      {shipmentTotalData?.shipmentData?.price && (
        <div className={styles.details}>
          <div>Standard shipment</div>
          <span>Shipment cost: $ {shipmentTotalData.shipmentData?.price}</span>
        </div>
      )}
      <div className={styles.total}>
        <h2>Total</h2>
        <span>
          $
          {shipmentTotalData?.shipmentData?.price
            ? (shipmentTotalData?.shipmentData?.price + totalPrice).toFixed(2)
            : totalPrice.toFixed(2)}
        </span>
      </div>
      <div className={styles.checkout}>
        {ids && (
          <BuyNowButton
            text={"Checkout"}
            color="blue"
            addIds={ids}
            inCart={true}
          />
        )}
      </div>
    </div>
  );
}
