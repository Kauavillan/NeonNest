"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import CartProduct from "../items/CartProduct";
import Loading from "../items/Loading";
import Shipment from "../items/Shipment";
import { ICartProduct } from "../interfaces/CartProducts";
import { useShipmentContext } from "../contexts/ShipmentContext";
import BuyNowButton from "../items/BuyNowButton";
import Button from "../items/Button";
import { TbTrashXFilled } from "react-icons/tb";
import PopUp from "../components/PopUp";
export default function Cart() {
  const { cartProducts, handleCartAdd, removeAllProducts } =
    useCartProductsContext();
  const shipmentTotalData = useShipmentContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [removeAllPopUp, setRemoveAllPopUp] = useState<boolean>(false);

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
    }
  }, [cartProducts]);

  useEffect(() => {
    if (shipmentTotalData?.shipmentData?.price)
      setTotalPrice(totalPrice + shipmentTotalData.shipmentData?.price);
  }, [shipmentTotalData!.shipmentData?.price]);

  useEffect(() => {}, [removeAllPopUp]);

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
            {removeAllPopUp === true && (
              <PopUp
                title="Are you sure you want to remove all products from your cart?"
                btn1Text="cancel"
                btn2Text="remove all"
                btn1Action={() => setRemoveAllPopUp(false)}
                btn2Action={removeAllProducts}
              />
            )}
            <div
              onClick={() => {
                setRemoveAllPopUp(!removeAllPopUp);
              }}
              className={styles.rmAll}
            >
              <Button text="Remove all" Icon={TbTrashXFilled} color="red" />
            </div>
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
              <span>
                $
                {shipmentTotalData?.shipmentData?.price
                  ? (
                      shipmentTotalData?.shipmentData?.price + totalPrice
                    ).toFixed(2)
                  : totalPrice.toFixed(2)}
              </span>
            </div>
            <div className={styles.checkout}>
              <BuyNowButton text={"Checkout"} color="blue" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
