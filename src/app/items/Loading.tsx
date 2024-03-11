import Image from "next/image";
import styles from "../../styles/Loading.module.scss";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
      <Image
        src="/assets/images/loading_product.svg"
        width={150}
        height={150}
        alt="loading gif"
      />
    </div>
  );
}
