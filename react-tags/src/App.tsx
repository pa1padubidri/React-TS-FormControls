import React from "react";
import Multiselect from "./multiselect/MultiSelect";
import { suggestions, ISuggestionType } from "./multiselect/certifications";

const App = () => {
  const [selectedItems, setSelectedItems] = React.useState<{
    [key: string]: ISuggestionType;
  } | null>(null);
  const [showMulti, setShowMulti] = React.useState<boolean>(true);

  const onSelect = (tags: { [key: string]: ISuggestionType }) => {
    setSelectedItems(tags);
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
        value="multiselect"
      ></input>
      <label htmlFor="multiselect">Multiselect</label>
      <input
        type="radio"
        name="select"
        value="not-multiselect"
        onChange={checkRadio}
      ></input>
      <label htmlFor="not-multiselect">No multiselect</label>
      {showMulti ? (
        <Multiselect
          options={suggestions}
          selectedItems={selectedItems}
          onSelect={onSelect}
        />
      ) : (
        <div>Multiselect reset</div>
      )}
    </div>
  );
};

export default App;
