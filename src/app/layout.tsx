"use client";
import { Chakra_Petch } from "next/font/google";
import "../styles/globals.scss";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import NavBar from "./components/NavBar";
import ProductsProvider from "./contexts/AllProductsContext";
import CartProductsProvider from "./contexts/CartProductsContext";
import { ShipmentProvider } from "./contexts/ShipmentContext";
import BoughtProductsProvider from "./contexts/BoughtProductsContext";
import UserDataProvider from "./contexts/UserDataContext";

const chakra_petch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NeonNest</title>
      </head>
      <body className={chakra_petch.className}>
        <WindowSizeProvider>
          <ShipmentProvider>
            <ProductsProvider>
              <BoughtProductsProvider>
                <CartProductsProvider>
                  <UserDataProvider>
                    <NavBar />
                    {children}
                  </UserDataProvider>
                </CartProductsProvider>
              </BoughtProductsProvider>
            </ProductsProvider>
          </ShipmentProvider>
        </WindowSizeProvider>
      </body>
    </html>
  );
}
