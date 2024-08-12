import { Field, Formik, Form } from "formik";
import {
  categoryField,
  categoryInitialValues,
  categoryvalidation,
} from "./category";

const AddCategories = () => {
  return (
    <div>
      <Formik
        initialValues={categoryInitialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={categoryvalidation}
      >
        {({ handleSubmit }) => (
          <Form>
            {categoryField.map((formValues, index) => {
              return (
                <section key={index}>
                  <label htmlFor={formValues.broswername}>
                    {formValues.broswername}
                  </label>
                  <Field type={formValues.type} name={formValues.name} />
                </section>
              );
            })}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategories;
