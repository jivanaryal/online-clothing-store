import { Field, Formik, Form, ErrorMessage } from "formik";
import { FormFields, validation } from "./products";
import { useEffect, useRef, useState } from "react";
import { getSingle } from "../../services/api";
import axios from "axios";
import { TCategory } from "../../types/category";
import { TSubCategory } from "../../types/subcategory";
import { FaTimes } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";

const EditProduct = () => {
  const [category, setCategory] = useState<TCategory[]>([]);
  const [subCategory, setSubCategory] = useState<TSubCategory[]>([]);
  const [newImage, setImage] = useState<File[]>([]);
  const [extraImage, setExtraImage] = useState<File[]>([]);
  const [oldImage, setOldImage] = useState<string[]>([]); // Store URLs or paths of old images

  const location = useLocation();

  const { id } = useParams();

  useEffect(() => {
    async function getCategory() {
      const res = await getSingle("/categories");
      const res1 = await axios.get(
        `http://localhost:5001/api/ocs/subcategories/${location.state.subcategory_id}`
      );

      setCategory(res.data);
      setSubCategory(res1.data);
    }

    getCategory();
  }, []);

  useEffect(() => {
    setOldImage(location.state.imageURL?.map((val) => val)); // Assuming imageURL is an array of image URLs
  }, []);

  const updateFormData = async (values) => {
    const formData = new FormData();

    FormFields.forEach((field) => {
      if (field.type !== "file") {
        formData.append(field.name, values[field.name] || "");
      }
    });

    newImage.forEach((file) => {
      formData.append("imageURL", file);
    });

    try {
      const response = await axios.patch(
        `http://localhost:5001/api/ocs/products/${id}`,
        formData
      );
      toast.success("Product added successfully");

      console.log("Product added successfully:", response.data);
    } catch (error) {
      toast.error("Product is not posted");
      console.error("Error adding product:", error);
    }
  };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: any
  ) => {
    const categoryId = event.target.value;
    setFieldValue("category_id", categoryId);

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
    const newSelectedImages = Array.from(event.target.files); // Convert FileList to Array
    setImage([...newImage, ...newSelectedImages]); // Append new images to the existing ones
    setExtraImage([...extraImage, ...newSelectedImages]); // Same for extraImage
  };

  const handleRemoveNewImage = (index: number) => {
    const updatedImages = extraImage.filter((_, i) => i !== index);
    setExtraImage(updatedImages);
    setImage(updatedImages);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveOldImage = (index: number) => {
    const updatedOldImages = oldImage.filter((_, i) => i !== index);
    setOldImage(updatedOldImages);
  };

  return (
    <main className="bg-[#F7F7F7] pt-2">
      <h1 className="text-center text-2xl font-medium my-4">Edit Product</h1>

      <section>
        <div>
          <Formik
            initialValues={{
              category_id: location.state.category_id,
              subcategory_id: location.state.subcategory_id,
              name: location.state.name,
              price: location.state.price,
              description: location.state.description,
              imageURL: location.state.imageURL,
              size: location.state.size,
              discount: location.state.discount,
              stockQuantity: location.state.stockQuantity,
            }}
            validationSchema={validation}
            onSubmit={(val) => {
              updateFormData(val);
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
                          className="flex flex-col gap-2 mb-4 capitalize text-gray-600 text-sm col-span-6"
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
                            value={values[formValues.name]}
                            className="py-2 w-full border-2 px-2 rounded text-gray-700"
                            onChange={(event) =>
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
                                    ? Number(option.category_id)
                                    : Number(option.subcategory_id)
                                }
                              >
                                {option.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={formValues.name}
                            component={"div"}
                            className="text-red-500 text-[12px] font-semibold"
                          />
                        </div>
                      );
                    }

                    if (formValues.type === "number") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-4 gap-2 mb-4 capitalize text-gray-600 text-sm"
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
                            className="py-2 w-full border-2 px-2 rounded text-gray-700"
                          ></Field>
                          <ErrorMessage
                            name={formValues.name}
                            component={"div"}
                            className="text-red-500 text-[12px] font-semibold"
                          />
                        </div>
                      );
                    }

                    if (formValues.type === "text") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-6 gap-2 mb-4 capitalize text-gray-600 text-sm"
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
                            className="py-2 w-full border-2 px-2 rounded text-gray-700"
                          ></Field>
                          <ErrorMessage
                            name={formValues.name}
                            component={"div"}
                            className="text-red-500 text-[12px] font-semibold"
                          />
                        </div>
                      );
                    }

                    if (formValues.type === "textarea") {
                      return (
                        <div
                          key={index}
                          className="flex flex-col col-span-6 gap-2 mb-4 capitalize text-gray-600 text-sm"
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
                            className="h-20 w-full border-2 px-2 rounded text-gray-700"
                          />
                          <ErrorMessage
                            name={formValues.name}
                            component={"div"}
                            className="text-red-500 text-[12px] font-semibold"
                          />
                        </div>
                      );
                    }

                    if (formValues.type === "file") {
                      return (
                        <div className="col-span-8 grid grid-cols-7">
                          <label className="col-span-full mb-4 text-sm font-semibold text-gray-600">
                            Product Images:
                          </label>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col border-2 h-24 justify-center max-w-32 rounded text-gray-500 bg-[#F7F7F7] col-span-2 items-center"
                          >
                            <IoMdCloudUpload className="text-2xl font-semibold" />
                            <p>Upload</p>
                          </label>
                          <input
                            id="file-upload"
                            type={formValues.type}
                            name={formValues.name}
                            accept=".png,.jpg,.jpeg,.gif"
                            multiple
                            onChange={(e) => handleImageChange(e)}
                            className="hidden"
                            ref={fileInputRef}
                          />

                          {/* Display Old Images */}
                          <div
                            className={`flex items-center col-span-full ${
                              oldImage.length === 0 ? "h-0" : "h-36"
                            }`}
                          >
                            {oldImage.map((val, i) => (
                              <div
                                key={i}
                                className="relative h-full max-w-56 mr-4 mt-4"
                              >
                                <img
                                  src={`http://localhost:5001${val}`}
                                  alt="old-img"
                                  className="h-full border-2 w-full object-contain"
                                />
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                                  onClick={() => handleRemoveOldImage(i)}
                                >
                                  <FaTimes className="text-sm" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Display New Images */}
                          <div
                            className={`flex items-center col-span-full ${
                              extraImage.length === 0 ? "h-0" : "h-36"
                            }`}
                          >
                            {extraImage.map((val, i) => (
                              <div
                                key={i}
                                className="relative h-full max-w-56 mr-4 mt-4"
                              >
                                <img
                                  src={URL.createObjectURL(val)}
                                  alt="new-img"
                                  className="h-full border-2 w-full object-contain"
                                />
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                                  onClick={() => handleRemoveNewImage(i)}
                                >
                                  <FaTimes className="text-sm" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 mb-5 mt-10 w-fit hover:bg-blue-500 text-white py-2 font-semibold px-3 text-xs rounded"
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

export default EditProduct;
