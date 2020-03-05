import * as React from "react";
import { Field } from "react-final-form";

type ErrorTextProps = {
  name: string;
};

const ErrorText: React.FC<ErrorTextProps> = ({ name }) => (
  <Field name={name}>
    {props =>
      props.meta.error && props.meta.touched ? (
        <span className="error">{props.meta.error}</span>
      ) : null
    }
  </Field>
);

export default ErrorText;
