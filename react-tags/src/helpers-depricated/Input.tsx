import * as React from "react";
import { CLASS_NAMES } from "./classNames";

const SIZER_STYLES = {
  position: "absolute",
  width: 0,
  height: 0,
  visibility: "hidden",
  overflow: "scroll",
  whiteSpace: "pre"
};

const STYLE_PROPS = [
  "fontSize",
  "fontFamily",
  "fontWeight",
  "fontStyle",
  "letterSpacing"
];
export interface myProps {
  autoresize?: boolean;
  autofocus?: boolean;
  classNames: typeof CLASS_NAMES;
  inputAttributes: object;
  inputEventHandlers: object;
  query: any;
  placeholder: any;
  expandable: any;
  listboxId: any;
  selectedIndex: any;
}

export default class Input extends React.Component<myProps, any> {
  private input: any;
  private sizer: any;
  constructor(props: any) {
    super(props);
    this.state = { inputWidth: null };
  }

  componentDidMount() {
    if (this.props.autoresize) {
      this.copyInputStyles();
      this.updateInputWidth();
    }

    if (this.props.autofocus) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    this.updateInputWidth();
  }

  copyInputStyles() {
    const inputStyle = window.getComputedStyle(this.input);

    STYLE_PROPS.forEach((prop: any) => {
      this.sizer.style[prop] = inputStyle[prop];
    });
  }

  updateInputWidth() {
    let inputWidth;

    if (this.props.autoresize) {
      // scrollWidth is designed to be fast not accurate.
      // +2 is completely arbitrary but does the job.
      inputWidth = Math.ceil(this.sizer.scrollWidth) + 2;
    }

    if (inputWidth !== this.state.inputWidth) {
      this.setState({ inputWidth });
    }
  }

  render() {
    const {
      inputAttributes,
      inputEventHandlers,
      query,
      placeholder,
      expandable,
      listboxId,
      selectedIndex
    } = this.props;

    return (
      <div className={this.props.classNames.searchInput}>
        <input
          {...inputAttributes}
          {...inputEventHandlers}
          ref={c => {
            this.input = c;
          }}
          value={query}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-input"
          aria-autocomplete="list"
          aria-label={placeholder}
          aria-owns={listboxId}
          aria-activedescendant={
            selectedIndex > -1 ? `${listboxId}-${selectedIndex}` : null
          }
          aria-expanded={expandable}
          style={{ width: this.state.inputWidth }}
        />
        <div
          ref={c => {
            this.sizer = c;
          }}
        >
          {query || placeholder}
        </div>
      </div>
    );
  }
}
