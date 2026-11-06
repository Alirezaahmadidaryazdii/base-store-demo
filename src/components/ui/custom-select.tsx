
"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  value,
  options,
  onChange,
  placeholder = "انتخاب کنید",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  return (
    <div
      className={`relative ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-11 w-full items-center justify-between gap-4 rounded-[var(--radius-md)] border px-4 text-xs transition-all duration-200 ${
          isOpen
            ? "border-[var(--color-primary)] bg-[var(--color-background)]"
            : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)]"
        }`}
      >
        <span className="truncate text-[var(--color-foreground)]">
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] p-1.5 shadow-[var(--shadow-dropdown)] animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-right text-xs transition-colors ${
                  isSelected
                    ? "bg-[var(--color-surface)] font-semibold text-[var(--color-primary)]"
                    : "text-[var(--color-foreground)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)]"
                }`}
              >
                {option.label}

                {isSelected && (
                  <Check
                    size={15}
                    className="text-[var(--color-primary)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
