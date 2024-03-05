export interface IProduct {
  id: number;
  title: string;
  price: number;
  discount?: number;
  description: string;
  discountedPrice?: number | string;
  categories: string[];
  images: string[] | string;
  qtd?: number;
}
