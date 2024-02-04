"use client";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import NavBar from "./components/NavBar";
import ProductsProvider from "./contexts/AllProductsContext";
import CartProductsProvider from "./contexts/CartProductsContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductsProvider>
          <WindowSizeProvider>
            <CartProductsProvider>
              <NavBar />
              {children}
            </CartProductsProvider>
          </WindowSizeProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
