import { useState, useCallback } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

interface UseFormValidationOptions<T extends Record<string, any>> {
  schema: z.ZodObject<any>;
  onSubmit: (data: T) => Promise<void> | void;
  onError?: (error: z.ZodError) => void;
  initialValues?: Partial<T>;
}

interface FormState<T> {
  values: Partial<T>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  onSubmit,
  onError,
  initialValues = {},
}: UseFormValidationOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      const fieldName = String(name);
      try {
        // Create a partial schema for the field
        const fieldSchema = z.object({ [fieldName]: schema.shape[fieldName] });
        fieldSchema.parse({ [fieldName]: value });
        setState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [fieldName]: undefined },
          touched: { ...prev.touched, [fieldName]: true },
        }));
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors.find((err) => err.path[0] === fieldName);
          setState((prev) => ({
            ...prev,
            errors: { ...prev.errors, [fieldName]: fieldError?.message },
            touched: { ...prev.touched, [fieldName]: true },
          }));
          return false;
        }
        return true;
      }
    },
    [schema]
  );

  const validateForm = useCallback(() => {
    try {
      schema.parse(state.values);
      setState((prev) => ({ ...prev, errors: {}, isValid: true }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce<Record<string, string>>(
          (acc, curr) => ({
            ...acc,
            [String(curr.path[0])]: curr.message,
          }),
          {}
        );
        setState((prev) => ({ ...prev, errors, isValid: false }));
        onError?.(error);
        return false;
      }
      return true;
    }
  }, [schema, state.values, onError]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = event.target;
      const finalValue = type === 'number' ? Number(value) : value;

      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: finalValue },
      }));

      validateField(name as keyof T, finalValue);
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }));
      validateField(name as keyof T, value);
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(state.values).reduce<Record<string, boolean>>(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setState((prev) => ({ ...prev, touched: allTouched }));

      if (!validateForm()) {
        toast.error('Please fix the form errors');
        return;
      }

      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        await onSubmit(state.values as T);
        toast.success('Form submitted successfully');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Form submission failed');
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [state.values, validateForm, onSubmit]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [String(name)]: value },
      }));
      validateField(name, value);
    },
    [validateField]
  );

  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [String(name)]: isTouched },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    validateField,
    validateForm,
  };
}

// Usage example:
// const {
//   values,
//   errors,
//   touched,
//   isSubmitting,
//   isValid,
//   handleChange,
//   handleBlur,
//   handleSubmit,
//   setFieldValue,
//   resetForm,
// } = useFormValidation({
//   schema: contactFormSchema,
//   onSubmit: async (data) => {
//     await submitContactForm(data);
//   },
//   onError: (error) => {
//     console.error('Validation error:', error);
//   },
//   initialValues: {
//     name: '',
//     email: '',
//     message: '',
//   },
// }); 