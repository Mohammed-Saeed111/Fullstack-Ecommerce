export default interface product {
  _id?: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  categoryId: string;
  brandId: string;
  isNewProduct: boolean;
  isFeatured: boolean;
}
