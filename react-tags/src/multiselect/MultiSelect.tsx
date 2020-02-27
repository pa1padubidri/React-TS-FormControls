import React, { useState } from "react";
import Select, { components } from "react-select";

const Menu = (props: any) => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 3 ? (
        props.children
      ) : (
        <div
          className={
            "react-select__menu-notice react-select__menu-notice--no-options"
          }
        >
          Maximum limit achieved
        </div>
      )}
    </components.Menu>
  );
};

const DropdownIndicator = (props: {
  // getStyles: any;
  innerProps: { [x: string]: any; ref: any };
}) => {
  const {
    // getStyles,
    innerProps: { ref, ...restInnerProps }
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <div style={{ padding: "0px 5px" }}>{/* <IconSearch /> */}</div>
    </div>
  );
};

type MultiselectProps = {
  options: Array<{ label: string; value: string }>;
  selectedItems: Array<string>;
  onSelect: (tags: any) => void;
};

const Multiselect: React.FC<MultiselectProps> = props => {
  const [typedTag, setTypedTag] = useState<string>("");

  const onInputChange = (tag: string) => {
    setTypedTag(tag);
  };

  return (
    <Select
      components={{ Menu, DropdownIndicator: DropdownIndicator }}
      defaultValue={props.selectedItems}
      isMulti
      options={props.options}
      onChange={props.onSelect}
      placeholder="Type a category. Ex: American Board of Internal Medicine"
      className="react-select-container"
      classNamePrefix="react-select"
      isSearchable={true}
      onInputChange={onInputChange}
      noOptionsMessage={() => null}
    />
  );
};

export default Multiselect;
