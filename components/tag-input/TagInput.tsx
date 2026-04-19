import { useState, useRef } from "react";

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add tag...",
  maxTags = 10,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase();
    if (!tag || value.includes(tag) || value.length >= maxTags) return;
    onChange([...value, tag]);
    setInputValue("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div
      data-component="TagInput"
      className={`flex flex-wrap items-center gap-1.5 rounded-lg border px-3 py-2 transition-colors bg-zinc-900 ${
        isFocused ? "border-indigo-500" : "border-zinc-700"
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-zinc-700 text-zinc-200 text-xs px-2 py-0.5 rounded"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="text-zinc-400 hover:text-zinc-100 ml-0.5"
          >
            ×
          </button>
        </span>
      ))}
      {value.length < maxTags && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-600"
        />
      )}
    </div>
  );
}
