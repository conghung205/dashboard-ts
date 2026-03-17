import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  placeholder?: string;
  delay?: number;
  onDebounceChange: (value: string) => void;
  defaultValue?: string;
};

function SearchBar({
  placeholder = "Search...",
  delay = 300,
  onDebounceChange,
  defaultValue = "",
}: Props) {
  const [text, setText] = useState(defaultValue);
  const debounced = useDebounce(text, delay);

  useEffect(() => {
    onDebounceChange(debounced.trim());
  }, [debounced, onDebounceChange]);

  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        placeholder={placeholder}
        className="p-2 bg-gray-800 border border-gray-700 rounded outline-none w-96 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;
