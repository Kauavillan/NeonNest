import Button from "../items/Button";
import styles from "../../styles/PopUp.module.scss";
import { Dispatch, SetStateAction } from "react";
type Dispatcher<S> = Dispatch<SetStateAction<S>>;
interface Props {
  title: string;
  btn1Text: string;
  btn2Text: string;
  btn1Action: () => void | Dispatcher<boolean>;
  btn2Action: () => void | Dispatcher<boolean>;
}
export default function PopUp({
  title,
  btn1Text,
  btn2Text,
  btn1Action,
  btn2Action,
}: Props) {
  return (
    <div className={styles.background}>
      <div className={styles.quit} onClick={btn1Action}></div>
      <div className={styles.container}>
        <h3>{title}</h3>
        <div className={styles.buttons}>
          <div onClick={btn1Action}>
            <Button text={btn1Text} color="blue" />
          </div>
          <div onClick={btn2Action}>
            <Button text={btn2Text} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
