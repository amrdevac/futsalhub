"use client";

import ValidationParse from "@/utils/validation/valdiationParse";
import useValidationStore from "@/utils/validation/validationStore";
import React, { ChangeEvent, useEffect, useState } from "react";

export type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

interface SelectOption {
  label: string;
  value: string;
}

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "file"
  | "custom"
  | "select" // Jika Anda juga ingin menambahkan select
  | "textarea"; // Jika Anda juga ingin menambahkan textarea

export interface BaseInputProps {
  label: string;
  bottomLable?: string | React.ReactNode;
  id?: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  grid?: number; // For grid system
  inputIcon?: React.ReactNode;
  labelIcon?: React.ReactNode;
  options?: SelectOption[]; // For select options
  selectedValue?: string; // For select
  customClass?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface CustomInputProps extends BaseInputProps {
  type: "custom";
  name: string;
  custom: React.ReactNode; // Custom input
  value?: any;
  onChange?: (e: InputChangeEvent) => void;
}

interface StandardInputProps extends BaseInputProps {
  type: Exclude<InputType, "custom">;
  name: string;
  custom?: React.ReactNode; // Custom input
  value: any;
  onChange: (e: InputChangeEvent) => void;
}

export type InputProps = CustomInputProps | StandardInputProps;
export const basicInputStyleClass =
  "input-on-dark  block  focus:outline focus:outline-base-100 w-full px-3 py-2 border  ring-3 rounded-md  shadow-sm ";

const getColSpanClass = (grid: number): string => {
  if (grid < 1) return "col-span-1"; // minimal 1
  if (grid > 12) return "col-span-12"; // maksimal 12
  return `col-span-${grid}`;
};
const BasicInput: React.FC<InputProps> = ({
  label,
  bottomLable,
  id,
  name,
  value,
  type,
  placeholder,
  required = false,
  grid = 12,
  inputIcon,
  labelIcon,
  options = [],
  selectedValue,
  custom,
  customClass,
  onChange,
  onBlur,
}) => {
  const colSpanClasses = [
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "col-span-6",
    "col-span-7",
    "col-span-8",
    "col-span-9",
    "col-span-10",
    "col-span-11",
    "col-span-12",
  ];

  const dataGrid = colSpanClasses[grid - 1] || "col-span-12";

  const validationStore = useValidationStore();
  useEffect(() => {
    Object.entries(validationStore.validation).forEach(([key, value]) => {
      const inputTag = document?.querySelector(`input[name='${key}']`);
      if (key in validationStore.validation) {
        if (inputTag) {
          inputTag.classList.add("border-red-500", "dark:border-red-500");
        }
      }
    });
  }, [validationStore.validation]);
  return (
    <div className={`form-group ${dataGrid}`}>
      <label htmlFor={name} className="block text-sm font-medium  text-on-dark">
        {labelIcon && <span className="mr-2">{labelIcon}</span>}
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {type === "select" ? (
        <div className="relative mt-1">
          <select
            id={id}
            name={name}
            value={selectedValue}
            onChange={onChange}
            onBlur={onBlur}
            className={`
              input-on-dark   
              block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm  
              ${customClass}
            `}
          >
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : type === "file" ? (
        <div className="relative mt-1">
          <input
            type="file"
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            className={`
              input-on-dark 
              block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm 
              ${customClass}
              `}
          />
          {/* Preview for image */}
          {value && typeof value === "string" && (
            <img
              src={value}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
      ) : type === "custom" && custom ? (
        <div className="relative mt-1">{custom}</div>
      ) : (
        <div className="relative mt-1">
          {inputIcon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {inputIcon}
            </span>
          )}
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={` 
              ${basicInputStyleClass} 
              ${inputIcon ? "pl-10" : ""}
              `}
            // ${customClass}
          />
        </div>
      )}
      <ValidationParse inputName={name ?? ""}  className="text-xs"/>
      {/* {bottomLable} */}
    </div>
  );
};

export default BasicInput;
