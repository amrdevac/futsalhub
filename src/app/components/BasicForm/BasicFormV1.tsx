"use client";

import { useState } from "react";
import { FrameData } from "./variable";

export const FormGenerator = ({
  formData,
  labelPosition,
}: {
  formData: FrameData;
  labelPosition: "side" | "top";
}) => {
  const [formValues, setFormValues] = useState({});

  const handleChangeDefault = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues({
        ...formValues,
        [name]: checked,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  return (
    <form className="p-4 space-y-4">
      {formData.data.map((field, idx) => {
        const labelClass =
          labelPosition === "side" ? "flex items-center" : "label";
        const inputClass =
          labelPosition === "side"
            ? "input input-bordered flex-grow ml-4"
            : "input input-bordered";

        const handleChange = (
          event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          if (field.onChange) {
            field.onChange(event);
          } else {
            handleChangeDefault(event);
          }
        };

        return (
          <div
            key={idx}
            className={`form-control ${labelPosition === "side" ? "flex" : ""}`}
          >
            <label className={labelClass} htmlFor={field.name}>
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                onChange={handleChange}
                required={field.required}
                className="select select-bordered"
              >
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows={field.rows || 3}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={field.required}
                className="textarea textarea-bordered"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={field.required}
                className={inputClass}
              />
            )}
          </div>
        );
      })}

      <div className="flex space-x-4">
        {formData.action.map((action, idx) => (
          <button
            key={idx}
            type={action.type} // Assuming actions are not submit buttons
            className="btn btn-primary"
            onClick={() => action.handler(formValues)}
          >
            {action.name}
          </button>
        ))}
      </div>
    </form>
    // <form className="p-4 space-y-4">
    //   {formData.data.map((field, idx) => {
    //     const labelClass =
    //       labelPosition === "side" ? " w-52 flex items-center" : "label";
    //     const inputClass =
    //       labelPosition === "side"
    //         ? " input input-bordered flex-grow ml-4"
    //         : "input input-bordered";

    //     return (
    //       <div
    //         key={idx}
    //         className={` ${labelPosition === "side" ? "flex" : ""}`}
    //       >
    //         <label className={labelClass} htmlFor={field.name}>
    //           {field.label}
    //         </label>
    //         {field.type === "select" ? (
    //           <select
    //             name={field.name}
    //             onChange={handleChange}
    //             required={field.required}
    //             className={inputClass}
    //           >
    //             {field.options?.map((option, index) => (
    //               <option key={index} value={option}>
    //                 {option}
    //               </option>
    //             ))}
    //           </select>
    //         ) : field.type === "textarea" ? (
    //           <textarea
    //             name={field.name}
    //             rows={field.rows || 3}
    //             placeholder={field.placeholder}
    //             onChange={handleChange}
    //             required={field.required}
    //             className={inputClass}
    //           ></textarea>
    //         ) : (
    //           <input
    //             type={field.type}
    //             name={field.name}
    //             placeholder={field.placeholder}
    //             onChange={handleChange}
    //             required={field.required}
    //             className={inputClass}
    //           />
    //         )}
    //       </div>
    //     );
    //   })}

    //   <div className="flex space-x-4">
    //     {formData.action.map((action, idx) => (
    //       <button
    //         key={idx}
    //         type="button" // Assuming actions are not submit buttons
    //         className="btn btn-primary"
    //         onClick={() => action.handler(formValues)}
    //       >
    //         {action.name}
    //       </button>
    //     ))}
    //   </div>
    // </form>
  );
};
