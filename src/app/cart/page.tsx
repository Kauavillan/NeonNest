"use client";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import Loading from "../items/Loading";
import Summary from "../components/Summary";
import CartProductsList from "../components/CartProductsList";
export default function Cart() {
  const { cartProducts } = useCartProductsContext();

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
          <CartProductsList />
          <Summary cartProducts={cartProducts} />
        </div>
      )}
    </main>
  );
}
