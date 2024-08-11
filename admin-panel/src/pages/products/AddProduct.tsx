import { Field, Formik, Form } from "formik";
import { FormFields, initialValues, validationSchema } from "./products";
import { useEffect, useRef, useState } from "react";
import { getSingle } from "../../services/api";
import axios from "axios";
import { TCategory } from "../../types/category";
import { TSubCategory } from "../../types/subcategory";
import { FaTimes } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";

const AddProduct = () => {
  const [category, setCategory] = useState<TCategory[]>([]);
  const [subCategory, setSubCategory] = useState<TSubCategory[]>([]);
  const [showimage, setShowImage] = useState("");
  const [newImage, setImage] = useState([]);
  const [extraImage, setExtraImage] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const res = await getSingle("/categories");
      setCategory(res.data);
    }

    getCategory();
  }, []);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const categoryId = event.target.value;
    setFieldValue("category_id", categoryId); // Update the Formik state

    if (categoryId) {
      const res = await axios.get(
        `http://localhost:5001/api/ocs/subcategories?category_id=${categoryId}`
      );
      setSubCategory(res.data);
    } else {
      setSubCategory([]);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  FormFields[1].options = category.map((cat) => ({
    category_id: cat.category_id,
    name: cat.name,
  }));
  FormFields[2].options = subCategory.map((sub) => ({
    subcategory_id: sub.subcategory_id,
    name: sub.name,
  }));

  const handleImageChange = (event) => {
    setShowImage(event.target.files[0]);
    setImage([...newImage, event.target.files[0]]);
    setExtraImage([...extraImage, event.target.files[0]]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = extraImage.filter((_, i) => i !== index);
    setExtraImage(updatedImages);
    setImage(updatedImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="bg-[#F7F7F7]  pt-2">
      <h1 className="text-center text-2xl font-medium my-4">Create Product</h1>

      <section className=" ">
        <div className=" ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(val) => {
              console.log(val);
            }}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="border-2 bg-white w-10/12 mx-auto p-10 rounded-sm"
              >
                <div className="grid grid-cols-12 gap-x-10">
                  {FormFields.map((formValues, index) => {
                    if (formValues.type === "select") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-2 mb-4 capitalize text-gray-600 text-sm col-span-6 "
                        >
                          <label
                            htmlFor={formValues.name}
                            className="font-semibold"
                          >
                            {formValues.broswername}
                          </label>
                          <Field
                            as="select"
                            name={formValues.name}
                            value={values[formValues.name]} // Controlled by Formik
                            className="py-2  w-full border-2 px-2 rounded text-gray-700 "
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) =>
                              formValues.name === "category_id"
                                ? handleCategoryChange(event, setFieldValue)
                                : setFieldValue(
                                    formValues.name,
                                    event.target.value
                                  )
                            }
                          >
                            <option value="" disabled>
                              Choose {formValues.broswername}
                            </option>

                            {formValues.options?.map((option) => (
                              <option
                                key={
                                  option.category_id ||
                                  option.subcategory_id ||
                                  option.name
                                }
                                value={
                                  formValues.name === "category_id"
                                    ? option.category_id
                                    : option.subcategory_id
                                }
                              >
                                {option.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      );
                    }
                    if (formValues.type === "number") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-4   gap-2 mb-4 capitalize text-gray-600 text-sm "
                        >
                          <label
                            htmlFor={formValues.name}
                            className="font-semibold"
                          >
                            {formValues.broswername}
                          </label>
                          <Field
                            type={formValues.type}
                            name={formValues.name}
                            className="py-2  w-full border-2 px-2 rounded text-gray-700 "
                          ></Field>
                        </div>
                      );
                    }
                    if (formValues.type === "text") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-6   gap-2 mb-4 capitalize text-gray-600 text-sm "
                        >
                          <label
                            htmlFor={formValues.name}
                            className="font-semibold"
                          >
                            {formValues.broswername}
                          </label>
                          <Field
                            type={formValues.type}
                            name={formValues.name}
                            className="py-2  w-full border-2 px-2 rounded text-gray-700 "
                          ></Field>
                        </div>
                      );
                    }
                    if (formValues.type === "textarea") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-6   gap-2 mb-4 capitalize text-gray-600 text-sm "
                        >
                          <label
                            htmlFor={formValues.name}
                            className="font-semibold"
                          >
                            {formValues.name}
                          </label>
                          <Field
                            as={formValues.type}
                            name={formValues.name}
                            placeholder={formValues.name}
                            className="h-20 w-full border-2 px-2 rounded text-gray-700 "
                          />
                        </div>
                      );
                    }

                    if (formValues.type === "file") {
                      return (
                        <div className="col-span-8 grid grid-cols-7 ">
                          <label className="col-span-full mb-4">
                            Product Images:
                          </label>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col border-2 h-24 justify-center max-w-32 rounded text-gray-500 bg-[#F7F7F7] col-span-2 items-center"
                          >
                            <IoMdCloudUpload className="text-2xl font-semibold" />
                            <p>upload</p>
                          </label>
                          <input
                            id="file-upload"
                            type={formValues.type}
                            name={formValues.name}
                            accept=".png,.jpg,.jpeg,.gif"
                            required
                            multiple
                            onChange={(e) => handleImageChange(e)}
                            className="hidden"
                            ref={fileInputRef}
                          />
                          <div
                            className={` flex items-center col-span-full ${
                              extraImage.length === 0 ? "h-0" : "h-36"
                            }`}
                          >
                            {extraImage &&
                              extraImage.map((val, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="relative h-full max-w-56 mr-4 mt-4"
                                  >
                                    <img
                                      src={URL.createObjectURL(val)}
                                      alt="img"
                                      className="h-full border-2 w-full  object-contain"
                                    />
                                    <button
                                      type="button"
                                      className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                                      onClick={() => handleRemoveImage(i)}
                                    >
                                      <FaTimes className="text-sm" />
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    }
                    // Handle other field types here
                    return null; // Handle other cases like text, number, etc.
                  })}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 mb-5 mt-10 w-fit hover:bg-blue-500 text-white f py-2 font-semibold  px-3 text-xs rounded"
                >
                  Submit item
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
