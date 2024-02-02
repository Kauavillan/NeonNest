import { IconType } from "react-icons";
import styles from "../../styles/Button.module.scss";
import { Children } from "react";
interface Props {
  text: string;
  Icon?: React.ElementType;
  color: string;
}
export default function Button({ text, Icon, color }: Props) {
  return (
    <button className={`${styles.but} ${styles[color]}`}>
      <div>
        {text}
        {Icon && <Icon />}
      </div>
    </button>
  );
}
