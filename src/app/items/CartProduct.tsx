import { ICartProduct } from "../interfaces/CartProducts";
export default function CartProduct({
  title,
  price,
  discount,
  images,
  qtd,
}: ICartProduct) {
  return (
    <div>
      <h3>{title}</h3>
      <span>{price}</span>
      <p>{qtd}</p>
    </div>
  );
}
