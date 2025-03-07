import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
  sync?: boolean;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError,
    sync = true,
  } = options;

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to get item from localStorage');
      onError?.(err);
      return initialValue;
    }
  });

  // Keep track of the current value for syncing across tabs
  const currentValue = useRef(storedValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(currentValue.current) : value;

        // Save to local state
        setStoredValue(valueToStore);
        currentValue.current = valueToStore;

        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to set item in localStorage');
        onError?.(err);
      }
    },
    [key, serializer, onError]
  );

  // Remove the item from localStorage
  const remove = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);
        currentValue.current = initialValue;
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to remove item from localStorage');
      onError?.(err);
    }
  }, [key, initialValue, onError]);

  // Sync state across tabs/windows
  useEffect(() => {
    if (!sync || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue
            ? deserializer(e.newValue)
            : initialValue;

          if (newValue !== currentValue.current) {
            setStoredValue(newValue);
            currentValue.current = newValue;
          }
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to sync localStorage');
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
    sync: {
      enabled: sync,
      key,
    },
  };
}

// Custom serializers/deserializers
export const dateSerializer = (date: Date) => date.toISOString();
export const dateDeserializer = (str: string) => new Date(str);

export const setSerializer = (set: Set<any>) => JSON.stringify(Array.from(set));
export const setDeserializer = (str: string) => new Set(JSON.parse(str));

export const mapSerializer = (map: Map<any, any>) =>
  JSON.stringify(Array.from(map.entries()));
export const mapDeserializer = (str: string) => new Map(JSON.parse(str));

// Usage example:
// interface User {
//   id: number;
//   name: string;
//   lastLogin: Date;
//   preferences: Set<string>;
// }
//
// const {
//   value: user,
//   setValue: setUser,
//   remove: removeUser,
// } = useLocalStorage<User>(
//   'user',
//   {
//     id: 1,
//     name: 'John Doe',
//     lastLogin: new Date(),
//     preferences: new Set(['dark-mode', 'notifications']),
//   },
//   {
//     serializer: (user) => JSON.stringify({
//       ...user,
//       lastLogin: dateSerializer(user.lastLogin),
//       preferences: setSerializer(user.preferences),
//     }),
//     deserializer: (str) => {
//       const data = JSON.parse(str);
//       return {
//         ...data,
//         lastLogin: dateDeserializer(data.lastLogin),
//         preferences: setDeserializer(data.preferences),
//       };
//     },
//     onError: (error) => {
//       console.error('LocalStorage error:', error);
//     },
//     sync: true,
//   }
// ); 