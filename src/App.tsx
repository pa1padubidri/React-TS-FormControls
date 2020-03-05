import * as React from "react";
import Wizard from "./form-component/Wizard";
import { Field, FieldRenderProps } from "react-final-form";
import { required, mustBeNumber, reqRad } from "./form-component/Validator";
import ErrorText from "./form-component/ErrorText";
import MultiSelect from "./multiselect/MultiSelect";
import { suggestions } from "./multiselect/certifications";
import Condition from "./form-component/Condition";

const getClassname = (props: FieldRenderProps<any>) => {
  return props.meta.error && props.meta.touched
    ? props.input.name === "multi"
      ? "red"
      : "error-box"
    : "";
};

const App = () => {
  return (
    <Wizard
      initialValues={{}}
      onFinalSubmit={values => alert(JSON.stringify({ values }, null, 2))}
    >
      <Wizard.Page>
        <div>
          <label>Age</label>
          <Field name="age" validate={mustBeNumber("age")}>
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  type="number"
                  className={getClassname({ input, meta })}
                />
              </div>
            )}
          </Field>
          <ErrorText name="age" />
        </div>
      </Wizard.Page>
      <Wizard.Page>
        <div>
          <label>Name</label>
          <Field name="name" validate={required("name")}>
            {props => (
              <div>
                <input
                  {...props.input}
                  type="text"
                  className={getClassname(props)}
                />
              </div>
            )}
          </Field>
          <ErrorText name="name" />
        </div>
      </Wizard.Page>
      <Wizard.Page>
        <div>
          <Field
            name="board_certified"
            value="Yes"
            component="input"
            type="radio"
            validate={required("radio")}
          />
          <label>Yes</label>
          <Field
            name="board_certified"
            value="No"
            component="input"
            type="radio"
          />
          <label>No</label>
          <ErrorText name="board_certified" />
          <br />
          <br />
          <Condition when="board_certified" is="Yes">
            <div>
              <label>Board</label>
              <Field name="multi" validate={reqRad("multi")}>
                {props => (
                  <MultiSelect
                    {...props}
                    options={suggestions}
                    boxColor={getClassname(props)}
                  />
                )}
              </Field>
              <ErrorText name="multi" />
            </div>
          </Condition>
        </div>
      </Wizard.Page>
      <Wizard.Page>
        <div className="checkbox-group">
          <div className="form-subtitle">Who performs this procedure?</div>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Nurse Practioner"
              component="input"
              type="checkbox"
              validate={reqRad("who_administers")}
            />{" "}
            <span className="checkbox" />
            Nurse Practioner
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Physician Assistant"
              component="input"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Physician Assistant
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Registered Nurse"
              component="input"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Registered Nurse
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Nurse - Other"
              component="input"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Nurse - Other
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Esthetician"
              component="input"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Esthetician
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              value="Medical Technician"
              component="input"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Medical Technician
          </label>

          <label className="checkbox-label">
            <Field
              name="who_administers"
              component="input"
              value="Other"
              type="checkbox"
            />{" "}
            <span className="checkbox" />
            Other
          </label>
          <br />
          <ErrorText name="who_administers" />
          <Condition when="who_administers" is={"Other"}>
            <div>
              <Field
                name="who_administers_text"
                validate={required("who_administers_text")}
              >
                {props => (
                  <textarea
                    {...props.input}
                    className={getClassname(props)}
                    placeholder="Who performs this procedure?"
                  />
                )}
              </Field>
              <ErrorText name="who_administers_text" />
            </div>
          </Condition>
        </div>
      </Wizard.Page>
    </Wizard>
  );
};

export default App;
