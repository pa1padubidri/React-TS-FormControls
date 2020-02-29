import React from "react";
import Multiselect from "./multiselect/MultiSelect";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { suggestions, ISuggestionType } from "./multiselect/certifications";

const App = () => {
  const [selectedItems, setSelectedItems] = React.useState<{
    [key: string]: ISuggestionType;
  } | null>(null);
  const [showMulti, setShowMulti] = React.useState<boolean>(true);

  const onSubmit = (values: any) => {
    console.dir(values);
  };

  const checkRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === "not-multiselect") setShowMulti(false);
    else setShowMulti(true);
  };

  return (
    <div>
      <input
        type="radio"
        name="select"
        defaultChecked
        onChange={checkRadio}
        value={"multiselect"}
      />
      <label htmlFor="multiselect">Multiselect</label>
      <input
        type="radio"
        name="select"
        value="not-multiselect"
        onChange={checkRadio}
      />
      <label htmlFor="not-multiselect">No multiselect</label>
      {showMulti ? (
        <Form onSubmit={onSubmit}>
          {props => (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="multi"
                component={Multiselect}
                options={suggestions}
              ></Field>
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
      ) : (
        <div>Multiselect reset</div>
      )}
      <br />
    </div>
  );
};

export default App;
