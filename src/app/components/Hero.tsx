import Image from "next/image";
import Person from "/public/images/Hero_Person.png";
import styles from "../../styles/Hero.module.scss";
import Button from "../items/Button";
import { useWindowSizeContext } from "../contexts/WindowSizeContext";
import Link from "next/link";
export default function Hero() {
  const windowSize = useWindowSizeContext();
  return (
    <div className={styles.hero} id="hero">
      <div className={styles.text}>
        <h1>
          Be ready for eferything with <strong>NeonNest</strong>!
        </h1>
        <p>
          With hypertechnological devices, NeonNest can provide you the best
          products for your safety and lifestyle improvement.
        </p>
        <p></p>
        <div className={styles.btnDiv}>
          <Link href="#products">
            <Button text="I will make my future easier" color="hero" />
          </Link>
        </div>
      </div>
      <div className={styles.person}>
        {windowSize.width > 1000 && <Image src={Person} alt="Person image" />}
      </div>
    </div>
  );
}
