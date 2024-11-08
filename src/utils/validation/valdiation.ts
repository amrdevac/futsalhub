import validationParam from "./message";
import useValidationStore from "./validationStore";

// Define types for the input and validation parameters
interface ValidationRule {
  rule: string;
  message?: Record<string, string>;
}
export type Validation = Record<string, string | ValidationRule>;
// type Validation = { [key: string]: string | ValidationRule };

interface ValidateInputParams {
  objInput: Record<string, any>;
  validation: Validation; // Menggunakan tipe `Validation` yang lebih terstruktur
  objCustomResponse?: Record<string, string>;
  showToast?: boolean;
}

// Validation result array
let arrValidationResult: Record<string, string[]> = {};
let validateType: string;
let InputValue: any;
let InputName: string;
let validateCustomMessage: string | undefined;
let mainInput: Record<string, any>;
let mainCustomResponse: Record<string, string>;

const isValidationRule = (
  value: string | ValidationRule
): value is ValidationRule => {
  return typeof value === "object" && "rule" in value;
};

// Main validation function
export const validateInput = ({
  objInput,
  validation,
  objCustomResponse = {},
  showToast = true,
}: ValidateInputParams) => {
  arrValidationResult = {};
  mainInput = objInput;
  mainCustomResponse = objCustomResponse;

  const mainValidation = useValidationStore.getState();
  mainValidation.resetValidation();

  Object.entries(objInput).forEach(([keyInput, valInput]) => {
    arrValidationResult[keyInput] = [];

    const validationEntry = validation[keyInput];
    let validationKey: string | undefined;
    let validationMessage: Record<string, string> = {};

    if (isValidationRule(validationEntry)) {
      validationKey = validationEntry.rule;
      validationMessage = validationEntry.message ?? {};
    } else if (typeof validationEntry === "string") {
      validationKey = validationEntry;
    }

    if (!validationKey) return;

    if (validationKey.includes("|")) {
      validationKey.split("|").forEach((valValidate) => {
        validateCustomMessage = validationMessage[valValidate.split(":")[0]];
        validationRun(valValidate, valInput, keyInput);
      });
    } else {
      validateCustomMessage = validationMessage[validationKey];
      validationRun(validationKey, valInput, keyInput);
    }
  });

  Object.entries(arrValidationResult).forEach(([key, value]) => {
    if (!value.length) delete arrValidationResult[key];
  });

  const validationResponse =
    Object.keys(arrValidationResult).length > 0
      ? { error: true }
      : { error: false };
  if (validationResponse.error) {
    mainValidation.setValidation(arrValidationResult);
    if (showToast) {
      throw console.error("Validation errors found!", arrValidationResult);
    }
  }

  return validationResponse;
};

// Validation functions
const validationRun = (
  argValValidate: string,
  argValInput: any,
  argKeyInput: string
) => {
  validateType = argValValidate;
  InputValue = argValInput;
  InputName = argKeyInput;

  _requiredValidation();
  _numericValidation();
  _whiteSpace();
  _moreThanSpace();
  _regex();
  _maxChar();
  // _alphaNum();
  //   _ip();
  _lessThanNum();
  _moreThanNum();
  _rangeTime24Validation();
  //   _arrRequiredValidation();
  //   _alphaNumStrip();
  //   _alphaNumMinus();
  //   _confirmation();
  //   _must();
  _emailValidation();
  _date();
  _date2();
};

// Individual validation functions
const _requiredValidation = () => {
  if (
    validateType === "required" &&
    (!InputValue || InputValue.trim() === "")
  ) {
    arrValidationResult[InputName].push(
      validateCustomMessage ||
        mainCustomResponse[validateType] ||
        validationParam[validateType]
    );
  }
};

const _numericValidation = () => {
  if (validateType === "numeric" && isNaN(Number(InputValue))) {
    arrValidationResult[InputName].push(
      validateCustomMessage ||
        mainCustomResponse[validateType] ||
        validationParam[validateType]
    );
  }
};

const _emailValidation = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validateType === "email" && !emailRegex.test(InputValue)) {
    arrValidationResult[InputName].push(
      validateCustomMessage ||
        mainCustomResponse[validateType] ||
        validationParam[validateType]
    );
  }
};

const _whiteSpace = () => {
  if (validateType === "no_whitespace" && /\s/.test(InputValue)) {
    arrValidationResult[InputName].push(
      validateCustomMessage ||
        mainCustomResponse[validateType] ||
        validationParam[validateType]
    );
  }
};

const _moreThanNum = () => {
  if (validateType.startsWith("more_than:")) {
    const threshold = parseFloat(validateType.split(":")[1]);
    if (parseFloat(InputValue) <= threshold) {
      arrValidationResult[InputName].push(
        validateCustomMessage ||
          mainCustomResponse[validateType] ||
          validationParam[validateType]
      );
    }
  }
};

const _lessThanNum = () => {
  if (validateType.startsWith("less_than:")) {
    const threshold = parseFloat(validateType.split(":")[1]);
    if (parseFloat(InputValue) >= threshold) {
      arrValidationResult[InputName].push(
        validateCustomMessage ||
          mainCustomResponse[validateType] ||
          validationParam[validateType]
      );
    }
  }
};

const _date = () => {
  if (validateType === "date") {
    const [day, month, year] = InputValue.split("-");
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
    if (Number(day) > daysInMonth) {
      arrValidationResult[InputName].push(
        validateCustomMessage ||
          mainCustomResponse[validateType] ||
          validationParam[validateType]
      );
    }
  }
};

const _date2 = () => {
  if (validateType === "date2") {
    const [year, month, day] = InputValue.split("-").map(Number);
    const inputDate = new Date(year, month - 1, day);
    if (
      inputDate.getDate() !== day ||
      inputDate.getMonth() + 1 !== month ||
      inputDate.getFullYear() !== year
    ) {
      arrValidationResult[InputName].push(
        validateCustomMessage ||
          mainCustomResponse[validateType] ||
          validationParam[validateType]
      );
    }
  }
};

const _moreThanSpace = () => {
  if (validateType == "moreThanSpace") {
    let regex = /^ *$/;
    if (regex.test(InputValue)) {
      arrValidationResult[InputName].push(validationParam[validateType]);
    }
  }
};

const _regex = () => {
  // if (validateType?.includes("regex")) {
  if (validateType.startsWith("regex:")) {
    const regexPattern = validateType.split("regex:")[1]; // Ambil pola regex yang diberikan
    const regex = new RegExp(regexPattern); // Buat RegExp dari pola yang diberikan

    // Memeriksa apakah nilai input sesuai dengan regex
    if (!regex.test(InputValue)) {
      arrValidationResult[InputName].push(
        validateCustomMessage ||
          mainCustomResponse[validateType] ||
          validationParam[validateType] ||
          `The input does not match the required pattern: ${regexPattern}` // Pesan default
      );
    }
  }
  // }
};

const _maxChar = () => {
  if (validateType?.includes("maxChar")) {
    const getMatcher = validateType.split(":")[1];
    const theValidateType = validateType.split(":")[0];

    if (theValidateType == "maxChar") {
      if (InputValue.length !== 0 && InputValue.length > getMatcher) {
        if (validateCustomMessage) {
          arrValidationResult[InputName].push(validateCustomMessage);
        } else {
          arrValidationResult[InputName].push(
            mainCustomResponse[theValidateType] ??
              validationParam["maxChar"].replace("___", getMatcher)
          );
        }
      }
    }
  }
};

const _rangeTime24Validation = () => {
  if (validateType?.includes("rangeTime24")) {
    const theValidateType = validateType.split(":")[0];

    if (theValidateType === "rangeTime24") {
      const times = InputValue.split(" - ");

      // Pastikan input memiliki dua bagian waktu yang dipisahkan oleh " - "
      if (times.length !== 2) {
        arrValidationResult[InputName].push(
          validateCustomMessage ??
            mainCustomResponse[theValidateType] ??
            "Format waktu tidak valid, harus dalam bentuk HH:MM - HH:MM"
        );
        return;
      }

      const isValidTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        if (
          !hours ||
          !minutes ||
          isNaN(Number(hours)) ||
          isNaN(Number(minutes)) ||
          Number(hours) < 0 ||
          Number(hours) > 23 ||
          Number(minutes) < 0 ||
          Number(minutes) > 59
        ) {
          return false;
        }
        return true;
      };

      // Validasi setiap bagian waktu (sebelum dan sesudah " - ")
      const isStartTimeValid = isValidTime(times[0]);
      const isEndTimeValid = isValidTime(times[1]);

      if (!isStartTimeValid || !isEndTimeValid) {
        arrValidationResult[InputName].push(
          validateCustomMessage ??
            mainCustomResponse[theValidateType] ??
            validationParam["rangeTime24"]
        );
      }
    }
  }
};
