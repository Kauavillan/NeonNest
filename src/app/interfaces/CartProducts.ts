export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  discount?: number;
  discountedPrice?: number | string;
  images: string | string[];
  qtd: number;
}
