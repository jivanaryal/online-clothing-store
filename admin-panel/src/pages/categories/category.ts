import * as Yup from "yup";

export const categoryInitialValues = {
  name: "",
  description: "",
};

export const categoryvalidation = Yup.object({
  name: Yup.string()
    .trim("Name cannot contain leading or trailing spaces")
    .required("Name is required")
    .matches(/^\S.*\S$/, "Name cannot be just spaces"),
  description: Yup.string().required("description is required"),
});

interface IFormField {
  name: keyof typeof categoryInitialValues;
  type: "text" | "textarea";
  broswername: string;
}

export const categoryField: IFormField[] = [
  {
    name: "name",
    type: "text",
    broswername: "category name",
  },
  {
    name: "description",
    type: "textarea",
    broswername: "category description",
  },
];
