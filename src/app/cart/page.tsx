"use client";
import { useEffect } from "react";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import CartProduct from "../items/CartProduct";
import Loading from "../items/Loading";
export default function Cart() {
  const { cartProducts, handleCartAdd } = useCartProductsContext();

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
        <div>
          {cartProducts.map((product) => {
            return (
              <CartProduct
                key={product.id}
                id={product.id}
                title={product.title}
                images={product.images[0]}
                price={product.price}
                discount={product.discount}
                qtd={product.qtd!}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
