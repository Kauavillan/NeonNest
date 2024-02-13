"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Shipment {
  price: number;
  time: number;
}
interface ShipmentContext {
  shipmentData: Shipment | null;
  showShipment: boolean;
  setShipmentFare: () => void;
}
export const ShipmentContext = createContext<ShipmentContext | null>(null);

export const ShipmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
  const [showShipment, setShowShipment] = useState<boolean>(false);
  function createRandomNumber(min: number, max: number) {
    const randNumber = Math.random();
    return Math.floor(randNumber * (max - min + 1)) + min;
  }

  function createShipment(): Shipment {
    return {
      price: createRandomNumber(0, 100),
      time: createRandomNumber(250, 300),
    };
  }

  useEffect(() => {
    const shipment = sessionStorage.getItem("shipment");
    if (shipment) {
      setShipmentData(JSON.parse(shipment));
      setShowShipment(true);
    }
  }, []);
  function setShipmentFare() {
    if (shipmentData === null) {
      const newShipment = createShipment();
      setShipmentData(newShipment);
      sessionStorage.setItem("shipment", JSON.stringify(newShipment));
      setShowShipment(true);
    }
  }
  const contextValue: ShipmentContext = {
    shipmentData,
    showShipment,
    setShipmentFare,
  };
  return (
    <ShipmentContext.Provider value={contextValue}>
      {children}
    </ShipmentContext.Provider>
  );
};

export function useShipmentContext() {
  return useContext(ShipmentContext);
}
