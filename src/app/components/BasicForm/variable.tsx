type FormFieldType =
  | "file"
  | "number"
  | "text"
  | "textarea"
  | "select"
  | "checkbox"; // Define the types of form fields

// Define a base type for FormField without options
type BaseFormField = {
  label: string; // Label for the input field
  name: string; // Name of the input field (used for form handling)
  type: Exclude<FormFieldType, "select">; // Exclude "select" from the type
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void; // Optional onChange handler
  placeholder?: string; // Placeholder text for inputs
  required?: boolean; // Whether the field is required
  rows?: number; // Number of rows for textarea inputs
};

// Define a type for FormField when type is "select"
type SelectFormField = {
  label: string; // Label for the input field
  name: string; // Name of the input field (used for form handling)
  type: "select"; // Type of the input field
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void; // Optional onChange handler
  options: string[]; // Options for select inputs (required for type "select")
  required?: boolean; // Whether the field is required
};

// Create a union type for FormField
type FormField = BaseFormField | SelectFormField;

type Action = {
  name: string; // Action button label
  type: "submit" | "reset" | "button"; // Type of button
  handler: (formValues: any) => void; // Function to handle button click
  className: string; // CSS classes for styling the button
};

export type FrameData = {
  data: FormField[]; // Array of form fields
  action: Action[]; // Array of action buttons
};
