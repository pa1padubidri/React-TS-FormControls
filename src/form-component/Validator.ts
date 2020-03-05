export const required = (name: string) => (value: any) =>
  value ? undefined : errorTexts(name);

export const mustBeNumber = (name: string) => (value: any) =>
  isNaN(value) ? errorTexts(name) : undefined;

const errorTexts = (name: string) => {
  switch (name) {
    case "board_certified_DocText":
      return "Question is required";
    case "radio" || "multi":
      return "Please select one";
    case "age":
      return "Enter a valid age";
    default:
      return "Required";
  }
};

export const reqRad = (name: string) => (value: any) => {
  return value && value.length ? null : errorTexts(name);
};
