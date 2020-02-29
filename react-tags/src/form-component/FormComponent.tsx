import React from "react";
import Multiselect from "../multiselect/MultiSelect";
import { Form, Field } from "react-final-form";
import { suggestions } from "../multiselect/certifications";

const FormComponent = () => {
  const onSubmit = (values: any) => {
    console.dir(values);
  };

  return (
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
              validate={e => (e ? undefined : "Please select one")}
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
              Submit
            </button>
            <button
              type="button"
              onClick={props.form.reset}
              disabled={props.submitting || props.pristine}
            >
              Reset
            </button>
          </form>
        )}
      </Form>
    </div>
  );
};

export default FormComponent;
