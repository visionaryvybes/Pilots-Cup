import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

interface UseFormProps<T> {
  schema: z.ZodType<T>;
  onSubmit: (data: T) => Promise<void> | void;
  initialValues?: Partial<T>;
}

interface FormState<T> {
  values: Partial<T>;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

export function useForm<T>({
  schema,
  onSubmit,
  initialValues = {},
}: UseFormProps<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const setFieldValue = (
    field: keyof T,
    value: any,
    shouldValidate = true
  ) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }));

    if (shouldValidate) {
      validateField(field, value);
    }
  };

  const validateField = (field: keyof T, value: any) => {
    try {
      schema.shape[field as string].parse(value);
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [field]: undefined },
      }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message;
        setState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [field]: message },
        }));
        return false;
      }
      return true;
    }
  };

  const validateForm = () => {
    try {
      schema.parse(state.values);
      setState((prev) => ({ ...prev, errors: {} }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path[0]]: curr.message,
          }),
          {}
        );
        setState((prev) => ({ ...prev, errors }));
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(state.values as T);
      toast.success('Form submitted successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const resetForm = () => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  };

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setFieldValue,
    handleSubmit,
    resetForm,
    validateField,
    validateForm,
  };
}

// Usage example:
// const form = useForm({
//   schema: contactFormSchema,
//   onSubmit: async (data) => {
//     await submitContactForm(data);
//   },
//   initialValues: {
//     name: '',
//     email: '',
//     message: '',
//   },
// }); 