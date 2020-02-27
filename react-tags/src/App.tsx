import React from "react";
import Multiselect from "./multiselect/MultiSelect";
import { certifications } from "./helpers/certifications";

const App = () => {
  const [selectedItems, setSelectedItems] = React.useState<Array<string>>([""]);
  const [showMulti, setShowMulti] = React.useState(true);
  const options = certifications.map(val => ({
    label: val,
    value: val
  }));

  const onSelect = (tags: any) => {
    let selected = Object.keys(tags).map(key => tags[key].value);
    setSelectedItems(selected);
  };

  const checkRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    if (event.currentTarget.value === "text") setShowMulti(false);
    else setShowMulti(true);
  };

  return (
    <div>
      <input
        type="radio"
        name="select"
        defaultChecked
        onChange={checkRadio}
        value="multiselect"
      ></input>
      <label htmlFor="multiselect">Multiselect</label>
      <input
        type="radio"
        name="select"
        value="text"
        onChange={checkRadio}
      ></input>
      <label htmlFor="text">Text</label>
      {showMulti ? (
        <Multiselect
          options={options}
          selectedItems={selectedItems}
          onSelect={onSelect}
        />
      ) : (
        <div>ok</div>
      )}
    </div>
  );
};

export default App;
