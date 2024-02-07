export interface IProduct {
  id: number;
  title: string;
  price: number;
  discount?: number;
  description: string;
  category: string;
  images: string[] | string;
  qtd?: number;
  rating: {
    rate: number;
    count: number;
  };
}
