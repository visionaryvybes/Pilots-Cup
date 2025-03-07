import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
  sync?: boolean;
}

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseSessionStorageOptions<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError,
    sync = true,
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to get item from sessionStorage');
      onError?.(err);
      return initialValue;
    }
  });

  const currentValue = useRef(storedValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(currentValue.current) : value;
        setStoredValue(valueToStore);
        currentValue.current = valueToStore;

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to set item in sessionStorage');
        onError?.(err);
      }
    },
    [key, serializer, onError]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
        setStoredValue(initialValue);
        currentValue.current = initialValue;
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to remove item from sessionStorage');
      onError?.(err);
    }
  }, [key, initialValue, onError]);

  const clear = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.clear();
        setStoredValue(initialValue);
        currentValue.current = initialValue;
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to clear sessionStorage');
      onError?.(err);
    }
  }, [initialValue, onError]);

  useEffect(() => {
    if (!sync || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === window.sessionStorage && e.key === key) {
        try {
          const newValue = e.newValue
            ? deserializer(e.newValue)
            : initialValue;

          if (newValue !== currentValue.current) {
            setStoredValue(newValue);
            currentValue.current = newValue;
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to sync sessionStorage');
          onError?.(err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, sync, deserializer, initialValue, onError]);

  return {
    value: storedValue,
    setValue,
    remove,
    clear,
    sync: {
      enabled: sync,
      key,
    },
  };
}

export const dateSerializer = (date: Date) => date.toISOString();
export const dateDeserializer = (str: string) => new Date(str);

export const setSerializer = (set: Set<any>) => JSON.stringify(Array.from(set));
export const setDeserializer = (str: string) => new Set(JSON.parse(str));

export const mapSerializer = (map: Map<any, any>) =>
  JSON.stringify(Array.from(map.entries()));
export const mapDeserializer = (str: string) => new Map(JSON.parse(str)); 