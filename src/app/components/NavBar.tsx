import Link from "next/link";
import styles from "../../styles/NavBar.module.scss";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import CategoriesList from "../items/CategoriesList";
export default function NavBar() {
  const [HeroVisible, SetHeroVisible] = useState<boolean>(true);
  const [showCatList, setShowCatList] = useState<boolean>(false);
  const { cartProducts } = useCartProductsContext();
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
        setShowCatList(false);
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
    <header className={`${styles.navbar} ${HeroVisible && styles.hide}`}>
      <nav>
        <ul>
          <li>
            <Link href={"/"} onClick={() => SetHeroVisible(true)}>
              <Image
                src={"/assets/images/logo.png"}
                alt="Website logo"
                width={60}
                height={60}
              />
            </Link>
          </li>
          <li onClick={() => setShowCatList(!showCatList)}>Products</li>
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
        </ul>
        <CategoriesList visible={showCatList} setVisible={setShowCatList} />
      </nav>
    </header>
  );
}
