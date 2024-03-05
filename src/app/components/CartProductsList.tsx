import { useState } from "react";
import styles from "../../styles/Cart.module.scss";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import { TbTrashXFilled } from "react-icons/tb";
import CartProduct from "../items/CartProduct";
import Shipment from "../items/Shipment";
import PopUp from "./PopUp";
import Button from "../items/Button";
export default function CartProductsList() {
  const { cartProducts, removeAllProducts } = useCartProductsContext();
  const [removeAllPopUp, setRemoveAllPopUp] = useState<boolean>(false);
  return (
    <div className={styles.prodsList}>
      {removeAllPopUp === true && (
        <PopUp
          title="Are you sure you want to remove all products from your cart?"
          btn1Text="cancel"
          btn2Text="remove all"
          btn1Action={() => setRemoveAllPopUp(false)}
          btn2Action={removeAllProducts}
        />
      )}
      <div className={styles.rmAll}>
        <span
          onClick={() => {
            setRemoveAllPopUp(!removeAllPopUp);
          }}
        >
          <Button text="Remove all" Icon={TbTrashXFilled} color="red" />
        </span>
      </div>
      {cartProducts!.map((product) => {
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
  );
}
