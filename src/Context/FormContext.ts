import { createContext, useContext } from "react";

export interface FormContextType<T> {
  values: Record<string, T>;
  errors: Record<string, string>;
  setFieldValue: (name: string, value: T) => void;
  validateField: (
    name: string,
    value: T,
    allValues?: Record<string, T>
  ) => void;
  schema: unknown;
  validateAll?: () => Promise<boolean>;
}

export const FormContext = createContext<FormContextType<unknown> | undefined>(
  undefined
);

export function useFormContext<T>() {
  const ctx = useContext(FormContext);
  if (!ctx)
    throw new Error("useFormContext must be used within a FormProvider");
  return ctx as FormContextType<T>;
}
