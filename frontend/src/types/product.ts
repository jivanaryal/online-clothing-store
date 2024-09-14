import { TReview } from "./review";
import { TCategory } from "./category";

export type Tproduct = {
  avgRating: number;
  product_id: string;
  name: string;
  description: string;
  price: number;
  category: TCategory;
  imageURL: string;
  discount_percentage: number;
  stockQuantity: number;
  images: string[];
  reviews: TReview[];
};
