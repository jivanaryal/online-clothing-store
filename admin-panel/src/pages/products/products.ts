import * as Yup from "yup";

export const initialValues = {
  category_id: "",
  subcategory_id: "",
  name: "",
  price: "",
  description: "",
  imageURL: "",
  brand: "",
  size: "",
  color: "",
  discount: "",
  stockQuantity: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  category_id: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  imageURLs: Yup.string().required("Image URLs are required"),
  brand: Yup.string().required("Brand is required"),
  size: Yup.string().required("Size is required"),
  color: Yup.string().required("Color is required"),
  subcategory_id: Yup.string().required("Subcategory is required"),
  discount: Yup.number().min(0, "Discount cannot be negative"),
  stockQuantity: Yup.number()
    .required("Stock Quantity is required")
    .min(0, "Stock Quantity cannot be negative"),
});

interface IOption {
  id?: string;
  category_id?: string | number;
  subcategory_id?: string | number;
  name: string;
}

interface IFormField {
  name: keyof typeof initialValues;
  type: "text" | "select" | "number" | "file";
  broswername: string;
  options?: IOption[];
}

export const FormFields: IFormField[] = [
  {
    name: "name",
    type: "text",
    broswername: "product name",
  },
  {
    broswername: "category",
    name: "category_id",
    type: "select",
    options: [],
  },
  {
    broswername: "sub-category",
    name: "subcategory_id",
    type: "select",
    options: [],
  },
  {
    broswername: "product price",
    name: "price",
    type: "number",
  },
  {
    broswername: "product description",
    name: "description",
    type: "text",
  },
  {
    broswername: "product brand",
    name: "brand",
    type: "text",
  },
  {
    broswername: "product size",
    name: "size",
    type: "text",
  },
  {
    broswername: "discount",
    name: "discount",
    type: "number",
  },
  {
    broswername: "stock quantity",
    name: "stockQuantity",
    type: "number",
  },
  {
    broswername: "upload image",
    name: "imageURL",
    type: "file",
  },
];
