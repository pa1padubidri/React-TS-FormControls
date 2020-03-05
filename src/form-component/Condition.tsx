import * as React from "react";
import { Field } from "react-final-form";

type ConditionProps = {
  when: string;
  is: string;
  children: React.ReactElement;
};

const Condition: React.FC<ConditionProps> = ({ when, is, children }) => {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) =>
        conditionChecker(when, value, is) ? children : null
      }
    </Field>
  );
};

const conditionChecker = (when: string, value: any, is: string) => {
  if (when === "who_administers") return value.includes("Other");
  else return value === is;
};

export default Condition;
