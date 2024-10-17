import { create } from "zustand";

interface ValidateSlice {
  validation: {
    [key: string]: string[];
  };
  setValidation: (newRule: any) => void;
  resetValidation: () => void;
}

const useValidationStore = create<ValidateSlice>((set, get) => ({
  validation: {},
  setValidation: (newRule: any) =>
    set(() => ({
      validation: newRule,
    })),
  resetValidation: () => {
    const currentValidation = get().validation; 
    Object.entries(currentValidation).forEach(([key, value]) => {
      const inputTag = document?.querySelector(`input[name='${key}']`);
      if (key in currentValidation) {
        if (inputTag) {
          inputTag.classList.remove("border-red-500", "dark:border-red-500");
        }
      }
    });
    set(() => ({
      validation: {},
    }));
  },
}));

export default useValidationStore;
