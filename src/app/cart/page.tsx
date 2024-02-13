"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import CartProduct from "../items/CartProduct";
import Loading from "../items/Loading";
import Shipment from "../items/Shipment";
import { ICartProduct } from "../interfaces/CartProducts";
import { useShipmentContext } from "../contexts/ShipmentContext";
import Button from "../items/Button";
export default function Cart() {
  const { cartProducts, handleCartAdd } = useCartProductsContext();
  const shipmentTotalData = useShipmentContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
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

      if (shipmentTotalData?.shipmentData?.price) {
        setTotalPrice(finalPrice + totalPrice);
      } else {
        setTotalPrice(finalPrice);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    if (shipmentTotalData?.shipmentData?.price)
      setTotalPrice(totalPrice + shipmentTotalData.shipmentData?.price);
  }, [shipmentTotalData!.shipmentData?.price]);
  return (
    <main className={styles.cart}>
      {cartProducts === undefined ? (
        <Loading />
      ) : cartProducts === null ? (
        <div>
          <h3>
            There's nothing in your cart now. Go shopping and be prepared to the
            future!
          </h3>
        </div>
      ) : (
        <div className={styles.container}>
          <div>
            {cartProducts.map((product) => {
              return (
                <CartProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  images={product.images}
                  price={product.price}
                  discount={product.discount}
                  discountedPrice={product.discountedPrice}
                  qtd={product.qtd!}
                />
              );
            })}
            <Shipment />
          </div>
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
                      ? (Number(product.discountedPrice) * product.qtd).toFixed(
                          2
                        )
                      : (Number(product.price) * product.qtd).toFixed(2)}
                  </span>
                </div>
              );
            })}
            {shipmentTotalData?.shipmentData?.price && (
              <div className={styles.details}>
                <div>Standard shipment</div>
                <span>
                  Shipment cost: $ {shipmentTotalData.shipmentData?.price}
                </span>
              </div>
            )}
            <div className={styles.total}>
              <h2>Total</h2>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <Button text="Checkout" color="blue" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
