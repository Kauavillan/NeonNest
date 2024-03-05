import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/UserDataForm.module.scss";
import Button from "../items/Button";
import { useUserDataContext } from "../contexts/UserDataContext";
import { useRouter } from "next/navigation";
import { useBoughtProductsContext } from "../contexts/BoughtProductsContext";
import { useCartProductsContext } from "../contexts/CartProductsContext";
import { MdOutlineErrorOutline } from "react-icons/md";
interface Props {
  setPopUp: Dispatch<SetStateAction<boolean>>;
  addIds: number[];
  inCart?: boolean;
}

export default function UserDataForm({ setPopUp, addIds, inCart }: Props) {
  const router = useRouter();
  const { removeAllProducts } = useCartProductsContext();
  const { userData, handleSetUserData } = useUserDataContext();
  const { addJustBoughtProducts } = useBoughtProductsContext();
  const [nameInput, setNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  function handleForm() {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    let wait = false;

    if (nameInput === "") {
      wait = true;
      setNameErrorMessage("Name is reqired");
    } else if (nameInput.length <= 3) {
      wait = true;
      setNameErrorMessage("Name is too short");
    }
    if (emailInput === "") {
      wait = true;
      setEmailErrorMessage("Email is reqired");
    } else if (!emailRegEx.test(emailInput)) {
      wait = true;
      setEmailErrorMessage("Unvalid email");
    }
    if (!wait) {
      handleSetUserData({ name: nameInput, email: emailInput });
      if (inCart) removeAllProducts();
      addJustBoughtProducts(addIds);
      router.push("/finished");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.quit} onClick={() => setPopUp(false)}></div>
      <div className={styles.popUp}>
        <h2>Before you finish, we need some info about you</h2>
        <div className={styles.form}>
          <div>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              value={nameInput}
              onChange={(event) => {
                setNameInput(event.target.value);
                nameErrorMessage && setNameErrorMessage(null);
              }}
              placeholder="Type your full name"
              className={`${nameErrorMessage ? styles.errorInput : ""}`}
            />
            <span className={styles.warning}>
              {nameErrorMessage && (
                <>
                  <MdOutlineErrorOutline /> {nameErrorMessage}
                </>
              )}
            </span>
          </div>
          <div>
            <label htmlFor="email">Your best e-mail</label>
            <input
              type="text"
              name="email"
              value={emailInput}
              onChange={(event) => {
                emailErrorMessage && setEmailErrorMessage(null);
                setEmailInput(event.target.value);
              }}
              className={`${emailErrorMessage ? styles.errorInput : ""}`}
              placeholder="name@email.com"
            />
            <span className={styles.warning}>
              {emailErrorMessage && (
                <>
                  <MdOutlineErrorOutline /> {emailErrorMessage}
                </>
              )}
            </span>
          </div>
          <div>
            <span onClick={handleForm}>
              <Button text="Confirm Info" color="blue" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
