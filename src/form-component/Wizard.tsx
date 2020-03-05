import * as React from "react";
import { Form } from "react-final-form";
import "../styles/Wizard.css";

type WizardProps = {
  onFinalSubmit: (values: object) => void;
  initialValues: object;
  children: any;
};

type PageProps = {
  children: React.ReactElement;
};

type IWizard = React.FC<WizardProps> & { Page: React.FC<PageProps> };

const Wizard: IWizard = props => {
  const { children, initialValues, onFinalSubmit } = props;
  const [page, setPage] = React.useState(0);
  const next = () =>
    setPage(page => Math.min(page + 1, React.Children.count(children) - 1));
  const previous = () => setPage(page => Math.max(page - 1, 0));
  const isLastPage = page === React.Children.count(children) - 1;
  const activePage: any = React.Children.toArray(children)[page];

  const validate = (values: any) =>
    activePage.props.validate ? activePage.props.validate(values) : {};

  const onSubmit = (values: any) => {
    if (isLastPage) {
      return onFinalSubmit(values);
    } else {
      next();
    }
  };
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="buttons">
            {!isLastPage && (
              <button
                type="submit"
                className="button-primary button-rounded button float-right"
              >
                Continue
              </button>
            )}
            {page > 0 && (
              <button
                type="button"
                className="button-secondary button-rounded button"
                onClick={previous}
              >
                Back
              </button>
            )}
            {isLastPage && (
              <button
                type="submit"
                className="button-primary button-rounded button float-right"
                disabled={submitting}
              >
                Submit
              </button>
            )}
          </div>
          <br />
          {activePage}
          <pre>{JSON.stringify({ values }, null, 2)}</pre>
        </form>
      )}
    </Form>
  );
};

Wizard.Page = ({ children }) => children;

export default Wizard;
