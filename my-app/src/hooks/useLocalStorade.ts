import { useEffect, useState } from "react";

export function useLocalStorade<T>(key: string, inittialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : inittialValue;
    } catch (error) {
      console.warn("UselocalStorage error", error);
      return inittialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("UselocalStorage save error", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
