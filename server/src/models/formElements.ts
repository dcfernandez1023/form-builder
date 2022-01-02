import { json } from "./Json";

export const types: string[] = [
  "INPUT",
  "RADIO",
  "SELECT",
  "TEXTAREA"
];

export const selectOption: json = {
  value: "",
  display: ""
}

export const elements: json = {
  INPUT: {
    id: "",
    type: "INPUT",
    name: "Input",
    label: "",
    required: false,
    placeholder: "",
    columns: 12
  },
  RADIO: {
    id: "",
    type: "RADIO",
    name: "Radio",
    label: "Radio",
    label1: "",
    label2: "",
    value1: "",
    value2: "",
    required: false,
    columns: 12
  },
  SELECT: {
    id: "",
    type: "SELECT",
    name: "Select",
    label: "",
    required: false,
    options: [],
    columns: 12
  },
  TEXTAREA: {
    id: "",
    type: "TEXTAREA",
    name: "Textarea",
    label: "",
    required: false,
    placeholder: "",
    rows: 4,
    columns: 12
  }
};
