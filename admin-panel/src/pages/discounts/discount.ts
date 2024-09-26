import * as Yup from "yup";

export const discountInitialValues = {
  product_id: "",
  discount_percentage: "",
  start_date: "",
  end_date: "",
  description: "",
};

export const discountvalidation = Yup.object({
  discount_percentage: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be at least 0")
    .max(100, "Discount percentage cannot exceed 100"),

  start_date: Yup.date()
    .required("Start date is required"),

  end_date: Yup.date()
    .required("End date is required")
    .min(Yup.ref("start_date"), "End date cannot be before start date"),

  description: Yup.string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

interface IFormField {
  name: keyof typeof discountInitialValues;
  type: "text" | "number" | "date" | "textarea";
  broswername: string;
}

export const discountField: IFormField[] = [
  {
    name: "product_id",
    type: "number",
    broswername: "Product ID",
  },
  {
    name: "discount_percentage",
    type: "number",
    broswername: "Discount Percentage",
  },
  {
    name: "start_date",
    type: "date",
    broswername: "Start Date",
  },
  {
    name: "end_date",
    type: "date",
    broswername: "End Date",
  },
  {
    name: "description",
    type: "textarea",
    broswername: "Description",
  },
];
