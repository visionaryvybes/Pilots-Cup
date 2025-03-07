import { FormEvent, useState } from 'react';

export type ValidationRule<T> = {
  validate: (value: any, formData?: T) => boolean;
  message: string;
};

export type FieldRules<T> = {
  [K in keyof T | string]?: ValidationRule<T>[];
};

export type FormErrors<T> = Partial<Record<keyof T | string, string>>;

export interface FormConfig<T> {
  initialData: T;
  validationRules?: FieldRules<T>;
  onSubmit?: (data: T) => Promise<void>;
}

export interface UseFormResult<T> {
  data: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  setFieldValue: (name: string, value: any) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  setErrors: (errors: FormErrors<T>) => void;
  reset: () => void;
}

export function useForm<T extends Record<string, any>>({
  initialData,
  validationRules = {},
  onSubmit
}: FormConfig<T>): UseFormResult<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to set a value at a nested path
  const setNestedValue = (obj: Record<string, any>, path: string[], value: any): Record<string, any> => {
    const [head, ...tail] = path;
    
    if (!head) {
      return obj;
    }
    
    if (tail.length === 0) {
      return { ...obj, [head]: value };
    }
    
    // If the next part is a number, ensure we have an array
    const nextIsArrayIndex = !isNaN(Number(tail[0]));
    const currentValue = obj[head] || (nextIsArrayIndex ? [] : {});
    
    return {
      ...obj,
      [head]: setNestedValue(
        typeof currentValue === 'object' ? { ...currentValue } : {},
        tail,
        value
      )
    };
  };

  const setFieldValue = (name: string, value: any) => {
    if (name.includes('.')) {
      const parts = name.split('.');
      setData(prevData => setNestedValue({ ...prevData }, parts, value) as T);
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }

    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Helper function to get a value at a nested path
  const getNestedValue = (obj: Record<string, any>, path: string[]): any => {
    const [head, ...tail] = path;
    
    if (!head || !obj || typeof obj !== 'object') {
      return undefined;
    }
    
    const value = obj[head];
    
    if (tail.length === 0) {
      return value;
    }
    
    return getNestedValue(value, tail);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate each field with rules
    Object.entries(validationRules).forEach(([field, rules]) => {
      if (!rules) return;

      // Get field value (handle nested fields)
      let fieldValue;
      if (field.includes('.')) {
        fieldValue = getNestedValue(data, field.split('.'));
      } else {
        fieldValue = data[field as keyof T];
      }

      // Apply validation rules
      for (const rule of rules) {
        if (!rule.validate(fieldValue, data)) {
          newErrors[field] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors as FormErrors<T>);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!onSubmit) return;
    
    // Validate form
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ form: error.message } as FormErrors<T>);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
  };

  return {
    data,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    setErrors,
    reset,
  };
}

// Common validation rules
export const commonValidationRules = {
  required: (message = 'This field is required'): ValidationRule<any> => ({
    validate: (value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim().length > 0;
      return value !== null && value !== undefined;
    },
    message,
  }),
  
  email: (message = 'Invalid email address'): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    },
    message,
  }),
  
  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return String(value).length >= length;
    },
    message,
  }),
  
  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return String(value).length <= length;
    },
    message,
  }),
  
  numeric: (message = 'Must be a number'): ValidationRule<any> => ({
    validate: (value) => {
      if (!value) return true; // Let required rule handle empty values
      return !isNaN(Number(value));
    },
    message,
  }),
}; 