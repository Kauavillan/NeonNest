"use client";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import NavBar from "./components/NavBar";
import ProductsProvider from "./contexts/AllProductsContext";
import CartProductsProvider from "./contexts/CartProductsContext";
import { ShipmentProvider } from "./contexts/ShipmentContext";
import BoughtProductsProvider from "./contexts/BoughtProductsContext";
import UserDataProvider from "./contexts/UserDataContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
