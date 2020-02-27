import * as React from "react";
import { CLASS_NAMES } from "./classNames";
import Tag from "./Tag";

const LIST_BOX_ID = "ReactTags-listbox";

const KEYS = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40
};

export interface ReactTagsProps {
  tags: Array<{
    name: string;
    value: string;
  }>;
  suggestions: Array<string>;
  handleDelete: (i: number) => void;
  handleAddition: (tag: string) => void;

  autoResize?: boolean;
  minQueryLength?: number;
  addOnBlur?: boolean;
  handleValidate?: any;
  autofocus?: any;
  classNames?: typeof CLASS_NAMES;
  allowNew?: boolean;
  delimiters?: Array<number>;
  delimiterChars?: Array<any>;
  allowBackspace?: boolean;
  placeholder?: string;
  clearInputOnDelete?: boolean;
  tagComponent?: typeof Tag;
  suggestionsFilter?: null;
  maxSuggestionsLength?: number;
  inputAttributes?: object;
  handleBlur?: any;
  handleFocus?: any;
  handleInputChange?: any;
}

const ReactTags: React.FC<ReactTagsProps> = props => {
  const [query, setQuery] = React.useState<string>("");
  const [focused, setFocused] = React.useState<boolean>(false);
  const [expandable, setExpandable] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [inputEventHandlers, setInputEventHandlers] = React.useState<object>(
    {}
  );
  //   const [inputEventHandlers, setInputAttributes] = React.useState<object>({});
  const [classNames, setClassNames] = React.useState<typeof CLASS_NAMES>({
    ...CLASS_NAMES,
    ...props.classNames
  });
  //   const [suggestions, setSuggestions] = React.useState<

  const TagComponent = props.tagComponent || Tag;
  const classNamesList = [classNames.root];
  let suggestions: {
    options: Array<any>;
  };

  setExpandable(focused && query.length >= props.minQueryLength);

  focused && classNamesList.push(classNames.rootFocused);

  const addTag = (tag: any) => {
    if (tag.disabled) {
      return;
    }

    if (
      typeof props.handleValidate === "function" &&
      !props.handleValidate(tag)
    ) {
      return;
    }

    props.handleAddition(tag);

    // reset the state
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleDelimiter = () => {
    if (query.length >= props.minQueryLength) {
      // Check if the user typed in an existing suggestion.
      const match = suggestions.options.findIndex(suggestion => {
        return suggestion.name.search(new RegExp(`^${query}$`, "i")) === 0;
      });

      const index = selectedIndex === -1 ? match : selectedIndex;

      if (index > -1 && suggestions.options[index]) {
        addTag(suggestions.options[index]);
      } else if (props.allowNew) {
        addTag({ name: query });
      }
    }
  };

  const handleBlur = () => {
    setFocused(false);
    setSelectedIndex(-1);

    if (props.handleBlur) {
      props.handleBlur();
    }

    if (props.addOnBlur) {
      handleDelimiter();
    }
  };

  const handleFocus = () => {
    setFocused(true);

    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  const handleInput = (event: any) => {
    if (props.handleInputChange) {
      props.handleInputChange(event.target.value);
    }

    setQuery(event.target.value);
  };

  const handleKeyDown = (e: any) => {
    const { delimiters, delimiterChars } = props;

    // when one of the terminating keys is pressed, add current query to the tags.
    if (
      delimiters.indexOf(e.keyCode) > -1 ||
      delimiterChars.indexOf(e.key) > -1
    ) {
      if (query || selectedIndex > -1) {
        e.preventDefault();
      }

      handleDelimiter();
    }

    // when backspace key is pressed and query is blank, delete the last tag
    if (
      e.keyCode === KEYS.BACKSPACE &&
      query.length === 0 &&
      props.allowBackspace
    ) {
      deleteTag(props.tags.length - 1);
    }

    if (e.keyCode === KEYS.UP_ARROW) {
      e.preventDefault();

      // if last item, cycle to the bottom
      if (selectedIndex <= 0) setSelectedIndex(suggestions.options.length - 1);
      else setSelectedIndex(selectedIndex - 1);
    }

    if (e.keyCode === KEYS.DOWN_ARROW) {
      e.preventDefault();
      setSelectedIndex((selectedIndex + 1) % suggestions.options.length);
    }
  };

  setInputEventHandlers({
    // Provide a no-op function to the input component to avoid warnings
    // <https://github.com/i-like-robots/input-tags/issues/135>
    // <https://github.com/facebook/react/issues/13835>
    onChange: () => {},
    onBlur: handleBlur,
    onFocus: handleFocus,
    onInput: handleInput,
    onKeyDown: handleKeyDown
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (document.activeElement !== event.target) console.dir(event);
  };

  const deleteTag = (index: number) => {
    props.handleDelete(index);
    if (props.clearInputOnDelete && query !== "") {
      setQuery("");
    }
  };

  return (
    <div>
      <div className={classNamesList.join("")} onClick={handleClick}></div>
      <div
        className={classNames.selected}
        aria-live="polite"
        aria-relevant="additions text"
      >
        {props.tags.map((tag, index) => (
          <TagComponent
            key={index}
            tag={tag}
            classNames={classNames}
            onDelete={() => deleteTag(index)}
          />
        ))}
      </div>
      <div className={classNames.search}></div>
    </div>
  );
};

export default ReactTags;
