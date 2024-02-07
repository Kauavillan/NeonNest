export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  discount?: number;
  images: string | string[];
  qtd: number;
}
