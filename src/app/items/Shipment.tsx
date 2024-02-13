import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../styles/Shipment.module.scss";
import { useEffect, useState } from "react";
import { useShipmentContext } from "../contexts/ShipmentContext";
export default function Shipment() {
  const [shipmentTime, setShipmentTime] = useState<number | null>(null);
  const [shipmentFare, setShipmentFare] = useState<number | null>(null);
  const ship = useShipmentContext();
  useEffect(() => {
    if (ship?.shipmentData) {
      setShipmentFare(ship.shipmentData.price);
      setShipmentTime(ship.shipmentData.time);
    }
  }, [ship]);
  return (
    <div className={styles.spm}>
      <div>
        <span>
          Shipment
          <FaTruck />
        </span>

        <button onClick={() => ship?.setShipmentFare()}>
          Verify location <FaMapMarkerAlt />
        </button>
      </div>
      {ship?.showShipment && (
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
