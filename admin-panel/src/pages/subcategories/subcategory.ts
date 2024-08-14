import * as Yup from "yup";

export const subcategoryInitialValues = {
  name: "",
  category_id: "",
  description: "",
};

export const subcategoryvalidation = Yup.object({
  name: Yup.string()
    .trim("Name cannot contain leading or trailing spaces")
    .required("Name is required")
    .matches(/^\S.*\S$/, "Name cannot be just spaces"),
  category_id: Yup.number().required("description is required"),
  description: Yup.string().required("description is required"),
});

interface IOption {
  id?: string;
  category_id?: string | number;
  name: string;
  description?: string;
}

interface IFormField {
  name: keyof typeof subcategoryInitialValues;
  type: "text" | "textarea" | "select";
  broswername: string;
  options?: IOption[];
}

export const subcategoryField: IFormField[] = [
  {
    name: "name",
    type: "text",
    broswername: "subcategory name",
  },
  {
    name: "category_id",
    type: "select",
    broswername: "category",
    options: [],
  },
  {
    name: "description",
    type: "textarea",
    broswername: "subcategory description",
  },
];
