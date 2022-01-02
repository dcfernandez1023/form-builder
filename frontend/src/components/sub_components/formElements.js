export const types = [
  "INPUT",
  "RADIO",
  "SELECT",
  "TEXTAREA"
];

const toNumber = (val) => {
  return parseInt(val);
}

const toBool = (val) => {
  if(val === "true") {
    return true;
  }
  return false;
}

const converters = {
  isPublished: toBool,
  required: toBool,
  columns: toNumber,
  rows: toNumber
}

export const convertField = (field, val) => {
  if(converters[field] !== undefined) {
    return converters[field](val);
  }
  return val;
}

export const selectOption = {
  value: "",
  display: ""
}

var cols = [];
for(var i = 1; i < 13; i++) {
  let option = {};
  option.value = i;
  option.display = i.toString();
  cols.push(option);
}

var rows = [];
for(var i = 1; i < 21; i++) {
  let option = {};
  option.value = i;
  option.display = i.toString();
  rows.push(option);
}

export const inputFields = [
  {value: "name", display: "Name", type: "string", element: "input"},
  {value: "label", display: "Label", type: "string", element: "input"},
  {value: "required", display: "Required", type: "boolean", element: "select",
    options: [
      {value: false, display: "False"},
      {value: true, display: "True"}
    ]
  },
  {value: "placeholder", display: "Placeholder", type: "string", element: "input"},
  {value: "columns", display: "Column Span",type: "number", element: "select", options: cols}
];

export const radioFields = [
  {value: "name", display: "Name", type: "string", element: "input"},
  {value: "label", display: "Label", type: "string", element: "input"},
  {value: "label1", display: "Label 1", type: "string", element: "input"},
  {value: "value1", display: "Value 1", type: "string", element: "input"},
  {value: "label2", display: "Label 2", type: "string", element: "input"},
  {value: "value2", display: "Value 2", type: "string", element: "input"},
  {value: "required", display: "Required", type: "boolean", element: "select",
    options: [
      {value: false, display: "False"},
      {value: true, display: "True"}
    ]
  },
  {value: "columns", display: "Column Span",type: "number", element: "select", options: cols}
];

export const selectFields = [
  {value: "name", display: "Name", type: "string", element: "input"},
  {value: "label", display: "Label", type: "string", element: "input"},
  {value: "required", display: "Required", type: "boolean", element: "select",
    options: [
      {value: false, display: "False"},
      {value: true, display: "True"}
    ]
  },
  {value: "columns", display: "Column Span",type: "number", element: "select", options: cols},
  {value: "options", display: "Options", type: "string", element: "inputs"}
];

export const textareaFields = [
  {value: "name", display: "Name", type: "string", element: "input"},
  {value: "label", display: "Label", type: "string", element: "input"},
  {value: "required", display: "Required", type: "boolean", element: "select",
    options: [
      {value: false, display: "False"},
      {value: true, display: "True"}
    ]
  },
  {value: "placeholder", display: "Placeholder", type: "string", element: "input"},
  {value: "rows", display: "Rows", type: "number", element: "select", options: rows},
  {value: "columns", display: "Column Span", type: "number", element: "select", options: cols}
];

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
    label: "Radio",
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
