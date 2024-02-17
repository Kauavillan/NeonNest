import btnStyles from "../../styles/Button.module.scss";
import styles from "../../styles/BuyNow.module.scss";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import { useShipmentContext } from "../contexts/ShipmentContext";
import { useRouter } from "next/navigation";
import { useBoughtProductsContext } from "../contexts/BoughtProductsContext";
interface Props {
  text: string;
  color: string;
  addIds: number[];
}

export default function BuyNowButton({ text, color, addIds }: Props) {
  const { cartProducts, handleCartAdd } = useCartProductsContext();
  const shipmentData = useShipmentContext();
  const [warning, setWarning] = useState<boolean>(true);
  const [showWarningMessage, setShowWarningMessage] = useState<boolean>(false);
  const { addJustBoughtProducts } = useBoughtProductsContext();
  const router = useRouter();
  useEffect(() => {
    if (shipmentData?.shipmentData) {
      setWarning(false);
    }
  }, [shipmentData]);
  function handleBuyButton() {
    setShowWarningMessage(true);
    if (!warning) {
      addJustBoughtProducts(addIds);
      router.push("/finished");
    }
  }
  return (
    <div className={styles.btnContainer}>
      <button
        onClick={() => handleBuyButton()}
        onMouseLeave={() => setShowWarningMessage(false)}
        className={`${btnStyles.but} ${btnStyles[color]} ${
          warning && showWarningMessage && styles.showWarning
        }`}
      >
        <div>
          <span>{text}</span>
          <FaCartShopping />
        </div>
      </button>
    </div>
  );
}
