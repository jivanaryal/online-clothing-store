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

export const validation = Yup.object({
  name: Yup.string()
    .trim("Name cannot contain leading or trailing spaces")
    .required("Name is required")
    .matches(/^\S.*\S$/, "Name cannot be just spaces"),
  category_id: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string()
    .trim("Description cannot contain leading or trailing spaces")
    .required("Description is required")
    .matches(/^\S.*\S$/, "Description cannot be just spaces"),
  brand: Yup.string()
    .trim("Brand cannot contain leading or trailing spaces")
    .required("Brand is required")
    .matches(/^\S.*\S$/, "Brand cannot be just spaces"),
  size: Yup.string()
    .trim("Size cannot contain leading or trailing spaces")
    .required("Size is required")
    .matches(/^\S.*\S$/, "Size cannot be just spaces"),
  color: Yup.string()
    .trim("Color cannot contain leading or trailing spaces")
    .required("Color is required")
    .matches(/^\S.*\S$/, "Color cannot be just spaces"),
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
  type: "text" | "select" | "number" | "file" | "textarea";
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
    broswername: "sub category",
    name: "subcategory_id",
    type: "select",
    options: [],
  },
  {
    broswername: "product description",
    name: "description",
    type: "textarea",
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
    broswername: "product color",
    name: "color",
    type: "text",
  },
  {
    broswername: "product price",
    name: "price",
    type: "number",
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
