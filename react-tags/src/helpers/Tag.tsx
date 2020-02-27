import * as React from "react";
import { CLASS_NAMES } from "./classNames";

export type TagProps = {
  classNames: typeof CLASS_NAMES;
  tag: {
    name: string;
    value: string;
  };
  onDelete: () => void;
};

const Tag: React.FC<TagProps> = props => {
  return (
    <button
      type="button"
      className={props.classNames.selectedTag}
      title="Click to remove certification"
      onClick={props.onDelete}
    >
      <span className={props.classNames.selectedTagName}>{props.tag.name}</span>
    </button>
  );
};
export default Tag;
