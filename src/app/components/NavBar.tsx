import Link from "next/link";
import styles from "../../styles/NavBar.module.scss";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartProductsContext } from "../contexts/CartProductsContext";
export default function NavBar() {
  const [HeroVisible, SetHeroVisible] = useState<boolean>(true);
  const { cartProducts, handleCartAdd } = useCartProductsContext();
  const isHeroSectionVisible = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      return rect.top >= -200 && rect.bottom <= window.innerHeight;
    }
    return false;
  };
  useEffect(() => {
    const handleScroll = (): void => {
      if (!isHeroSectionVisible()) {
        SetHeroVisible(false);
      } else {
        SetHeroVisible(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`${styles.navbar} ${HeroVisible && styles.hide}`}>
      <ul>
        <li>
          <Link href={"/"} onClick={() => SetHeroVisible(true)}>
            <Image
              src={"/images/logo.png"}
              alt="Website logo"
              width={60}
              height={60}
            />
          </Link>
        </li>
        <li>
          <Link href={"/"} onClick={() => SetHeroVisible(true)}>
            Products
          </Link>
        </li>
        <li>
          <Link href={"/cart"}>
            {cartProducts && cartProducts.length > 0 && (
              <div>
                <span>{cartProducts.length}</span>
              </div>
            )}
            <FaCartShopping />
          </Link>
        </li>
        <li>
          <IoSearch />
        </li>
      </ul>
    </nav>
  );
}
