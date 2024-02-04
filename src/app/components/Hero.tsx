import Image from "next/image";
import Person from "../../../public/images/Hero_Person.png";
import styles from "../../styles/Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.hero} id="hero">
      <div className={styles.title}>
        <h1>Your Gateway to Tomorrow’s Gadgets – NeonNest</h1>
      </div>
      <div className={styles.person}>
        <Image src={Person} alt="Person image" />
      </div>
    </div>
  );
}
