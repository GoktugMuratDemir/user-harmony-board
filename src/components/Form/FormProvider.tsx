import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FormContext } from "../../Context/FormContext";
import type { FormContextType } from "../../Context/FormContext";
import * as yup from "yup";

interface FormProviderProps<T extends object> {
  children: React.ReactNode;
  schema: yup.ObjectSchema<T>;
  initialValues?: T;
}

function FormProviderInner<T extends object>(
  { children, schema, initialValues = {} as T }: FormProviderProps<T>,
  ref: React.Ref<FormProviderRef<T>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setFieldValue: FormContextType<T>["setFieldValue"] = (name, value) => {
    setValues((prev) => {
      const newVals = { ...prev, [name]: value };
      validateField(name, value, newVals);
      return newVals;
    });
  };

  const validateField: FormContextType<T>["validateField"] = async (
    name,
    value,
    allValues
  ) => {
    try {
      await schema.validateAt(name, allValues || { ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const validateAll = async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError && err.inner) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    validateAll,
    values,
    errors,
  }));

  return (
    <FormContext.Provider
      value={
        {
          values,
          errors,
          setFieldValue,
          validateField,
          schema,
          validateAll,
        } as unknown as FormContextType<unknown>
      }
    >
      {children}
    </FormContext.Provider>
  );
}

type FormProviderRef<T extends object> = {
  validateAll: () => Promise<boolean>;
  values: T;
  errors: Record<string, string>;
};

export const FormProvider = forwardRef(FormProviderInner) as <T extends object>(
  props: FormProviderProps<T> & { ref?: React.Ref<FormProviderRef<T>> }
) => React.ReactElement;
