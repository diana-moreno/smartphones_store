export type ItemInCart = {
  id: string;
  productId: string;
  name: string;
  imageUrl: string;
  color: { name: string; hexCode: string };
  storage: { capacity: string };
  price: number;
};
