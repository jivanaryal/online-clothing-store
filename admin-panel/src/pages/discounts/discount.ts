import * as Yup from "yup";

// Initial form values
export const discountInitialValues = {
  product_id: "",
  discount_percentage: "",
  start_date: "",
  end_date: "",
  description: "",
};

// Validation schema using Yup
export const discountvalidation = Yup.object({
  discount_percentage: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be at least 0")
    .max(100, "Discount percentage cannot exceed 100"),

  start_date: Yup.date()
    .required("Start date is required")
    .nullable(), // Ensure that Formik properly handles null values

  end_date: Yup.date()
    .required("End date is required")
    .nullable() // Ensure that Formik properly handles null values
    .test(
      "is-after-start",
      "End date must be at least one day after the start date",
      function (value) {
        const { start_date } = this.parent;
        // Ensure both dates are valid and end_date is at least one day after start_date
        return start_date && value && new Date(value) > new Date(new Date(start_date).setDate(new Date(start_date).getDate() + 1));
      }
    ),

  description: Yup.string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
});

// Form field configuration
interface IFormField {
  name: keyof typeof discountInitialValues;
  type: "text" | "number" | "date" | "textarea";
  broswername: string;
}

// Field definitions for the form
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
