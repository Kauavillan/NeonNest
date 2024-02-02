import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../styles/Shipment.module.scss";
import { useState } from "react";
export default function Shipment() {
  const [shipmentTime, setShipmentTime] = useState<number | null>(null);
  const [shipmentFare, setShipmentFare] = useState<number | null>(null);
  function createRandomNumber(min: number, max: number) {
    const randNumber = Math.random();
    return Math.floor(randNumber * (max - min + 1)) + min;
  }
  function handleShipment(): void {
    if (shipmentTime === null) {
      setShipmentTime(createRandomNumber(250, 300));
      setShipmentFare(createRandomNumber(0, 100));
    }
  }
  return (
    <div className={styles.spm}>
      <div>
        <span>
          Check shipment
          <FaTruck />
        </span>

        <button onClick={() => handleShipment()}>
          Verify location <FaMapMarkerAlt />
        </button>
      </div>
      {shipmentTime && (
        <div>
          <p>
            Standard shipment:{" "}
            {shipmentFare === 0 ? "FREE" : `$${shipmentFare}`}
            <span>approximately {shipmentTime} years</span>
          </p>
        </div>
      )}
    </div>
  );
}
