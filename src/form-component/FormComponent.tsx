import * as React from "react";
// import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import Select from "react-select";

// const required = name => value => (value ? undefined : name === "board_certified_DocText" ? 'Question is required' : 'Please provide a response');

const required = (name: string) => (value: string) =>
  value
    ? undefined
    : name === "board_certified_DocText"
    ? "Question is required"
    : "Please provide a response";

const FormComponent = () => {
  const onSubmit = (values: any) => {
    console.dir(values);
  };
  const required = (value: string) => (value ? undefined : "Required");

  return (
<<<<<<< HEAD
    <div>
      <Form onSubmit={onSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field
              name="multi"
              component={Multiselect}
              options={suggestions}
            ></Field>
            <br />
            <Field name="radio" component="input" type="radio" value="yes" />
            Yes
            <br />
            <Field
              name="radio"
              component="input"
              type="radio"
              value="no"
              validate={required("radio")}
            >
              {props => (
                <div>
                  <input {...props.input} />
                  No
                  <br />
                  <span>
                    {(props.meta.submitSucceeded || props.meta.submitFailed) &&
                    props.meta.error
                      ? props.meta.error
                      : undefined}
                  </span>
                </div>
              )}
            </Field>
            <button type="submit" disabled={props.submitting}>
=======
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
>>>>>>> parent of c6e709c... Added radio validation
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
