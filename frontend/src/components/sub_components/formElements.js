export const types = [
  "INPUT",
  "RADIO",
  "SELECT",
  "TEXTAREA"
];

export const selectOption = {
  value: "",
  display: ""
}

export const elements = {
  INPUT: {
    id: "",
    type: "INPUT",
    name: "Input",
    label: "Input",
    required: false,
    placeholder: "",
    columns: 12
  },
  RADIO: {
    id: "",
    type: "RADIO",
    name: "Radio",
    mainLabel: "",
    label1: "Radio 1",
    label2: "Radio 2",
    value1: "",
    value2: "",
    required: false,
    columns: 12
  },
  SELECT: {
    id: "",
    type: "SELECT",
    name: "Select",
    label: "Select",
    required: false,
    options: [],
    columns: 12
  },
  TEXTAREA: {
    id: "",
    type: "TEXTAREA",
    name: "Textarea",
    label: "Textarea",
    required: false,
    placeholder: "",
    rows: 4,
    columns: 12
  }
};
