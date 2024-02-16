import { ICartProduct } from "../interfaces/CartProducts";
import styles from "../../styles/CartProduct.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import Link from "next/link";
import { TbTrashFilled } from "react-icons/tb";
export default function CartProduct({
  id,
  title,
  price,
  discount,
  discountedPrice,
  images,
  qtd,
}: ICartProduct) {
  const { changeProdQtd, removeOneProduct } = useCartProductsContext();

  const [quant, setQuant] = useState(qtd);

  useEffect(() => {
    changeProdQtd(id, quant);
  }, [quant]);

  type Signals = "p" | "m";

  function handleChangeOne(sig: Signals) {
    sig === "p" ? setQuant(quant + 1) : setQuant(quant - 1);
  }

  return (
    <div className={styles.prod}>
      <div>
        <Link href={`/products/${id}`}>
          <Image
            src={Array.isArray(images) ? images[0] : images}
            alt={`${title} image`}
            width="200"
            height="150"
          />
        </Link>
      </div>
      <div className={styles.details}>
        <h3>
          <Link href={`/products/${id}`}>{title}</Link>
        </h3>

        <div className={`${styles.qtd} ${quant === 1 && styles.notMinus}`}>
          <FaMinus onClick={() => quant > 1 && handleChangeOne("m")} />

          <p>{quant}</p>

          <FaPlus onClick={() => handleChangeOne("p")} />
        </div>
        <div>
          <span>
            ${" "}
            {discount
              ? (Number(discountedPrice) * quant).toFixed(2)
              : (Number(price) * quant).toFixed(2)}
          </span>
        </div>
        <div className={styles.remove}>
          <TbTrashFilled onClick={() => removeOneProduct(id)} />
        </div>
      </div>
    </div>
  );
}
