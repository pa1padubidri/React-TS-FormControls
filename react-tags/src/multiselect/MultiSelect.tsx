import * as React from "react";
import Select from "react-select";
import { IOptions, ISuggestionType } from "./certifications";
import { FieldRenderProps } from "react-final-form";

type MultiselectProps = {
  name: string;
  options: Array<ISuggestionType>;
  onChange: (tags: any) => void;
  value: any;
};

const Multiselect: React.FC<FieldRenderProps<ISuggestionType> &
  IOptions> = props => {
  const [openMenu, setOpenMenu] = React.useState(false);

  const onInputChange = (query: string, event: { action: string }) => {
    if (event.action === "input-change") setOpenMenu(true);
    if (query === "") setOpenMenu(false);
  };

  const filterOption = (option: ISuggestionType, rawInput: string) => {
    const { label, value } = option;
    const matchedSuggestions = props.options.filter(
      opt =>
        opt.label === label &&
        opt.value.toLowerCase().includes(rawInput.toLowerCase())
    );
    return (
      value.toLowerCase().includes(rawInput.toLowerCase()) ||
      matchedSuggestions.length > 0
    );
  };

  return (
    <div>
      <Select
        filterOption={filterOption}
        defaultValue={props.input.value}
        isMulti={true}
        options={props.options}
        onChange={props.input.onChange}
        placeholder="Type a category. Ex: American Board of Internal Medicine"
        className="react-select-container"
        classNamePrefix="react-select"
        isSearchable={true}
        onInputChange={onInputChange}
        noOptionsMessage={() => "Does not exist"}
        menuIsOpen={openMenu}
      />
      {props.meta.error && props.meta.touched && (
        <span>{props.meta.error}</span>
      )}
    </div>
  );
};

export default Multiselect;
