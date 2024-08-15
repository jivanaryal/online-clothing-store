export type TProduct = {
  product_id: number;
  name: string;
  category_id: string;
  price: number;
  description: string;
  imageURL: string[]; // Assuming this is a JSON string
  brand: string;
  size: string;
  color: string;
  subcategory_id: string;
  discount?: number; // Optional field
  stockQuantity: number;
};
