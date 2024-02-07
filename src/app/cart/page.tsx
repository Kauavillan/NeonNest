"use client";
import { useContext } from "react";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import Image from "next/image";
import CartProduct from "../items/CartProduct";
export default function Cart() {
  const { cartProducts, handleCartAdd } = useCartProductsContext();
  console.log(cartProducts);
  return (
    <main className={styles.cart}>
      {!cartProducts ? (
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
