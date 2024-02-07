import { IconType } from "react-icons";
import styles from "../../styles/Button.module.scss";
import { useEffect } from "react";
import { useCartProductsContext } from "../contexts/CartProductsContext";
interface Props {
  id?: number;
  text: string;
  Icon?: React.ElementType;
  color: string;
}

export default function Button({ id, text, Icon, color }: Props) {
  const { cartProducts, handleCartAdd } = useCartProductsContext();
  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  return (
    <>
      {id !== undefined ? (
        <button
          className={`${styles.but} ${styles[color]}`}
          onClick={() => handleCartAdd(id)}
        >
          <div>
            {text}
            {Icon && <Icon />}
          </div>
        </button>
      ) : (
        <button className={`${styles.but} ${styles[color]}`}>
          <div>
            {text}
            {Icon && <Icon />}
          </div>
        </button>
      )}
    </>
  );
}
