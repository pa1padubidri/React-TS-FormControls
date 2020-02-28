import * as React from "react";
// import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import Select from "react-select";

const FormComponent = () => {
  const onSubmit = (values: any) => {
    console.dir(values);
  };
  const required = (value: string) => (value ? undefined : "Required");

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="drName" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Dr Name</label>
                <br />
                <input {...input} type="text" placeholder="Dr House" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <br />
          <Field name="multiselect">{({ input }) => <div></div>}</Field>
          <br />
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    </Form>
  );
};
export default FormComponent;
