"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";

/*
 * Form controls shared by the seller, enquiry and investor forms.
 * Every control has a visible label, a hint slot and an error slot wired up
 * with aria-describedby / aria-invalid.
 */

const controlBase =
  "block w-full min-h-13 border-2 bg-white px-4 py-3 text-[1.0625rem] text-green-900 placeholder:text-control transition-colors focus:border-green-900 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

export function ErrorText({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex gap-2 text-[0.9375rem] font-bold text-terracotta-dark">
      <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="currentColor" />
        <rect x="9" y="5" width="2" height="7" fill="#fff" />
        <rect x="9" y="13.5" width="2" height="2" fill="#fff" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

type TextFieldProps = {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  prefix?: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, hint, error, prefix, optional, className = "", ...input }: TextFieldProps) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold text-green-900">
        {label}
        {optional && <span className="font-normal text-ink"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem]">
          {hint}
        </p>
      )}
      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-bold text-green-900" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`${controlBase} ${prefix ? "pl-10" : ""} ${error ? "border-terracotta" : "border-control"}`}
          {...input}
        />
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </div>
  );
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  className = "",
  ...rest
}: {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold text-green-900">
        {label}
        {optional && <span className="font-normal text-ink"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem]">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`${controlBase} mt-2 min-h-32 ${error ? "border-terracotta" : "border-control"}`}
        {...rest}
      />
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </div>
  );
}

export function SelectField({
  label,
  error,
  optional,
  options,
  placeholder = "Choose one",
  className = "",
  ...rest
}: {
  label: ReactNode;
  error?: string;
  optional?: boolean;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold text-green-900">
        {label}
        {optional && <span className="font-normal text-ink"> (optional)</span>}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${controlBase} appearance-none pr-12 ${error ? "border-terracotta" : "border-control"}`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-green-900" aria-hidden="true">
          <path d="m4 7 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </div>
  );
}

/** Large tappable radio or checkbox cards inside a fieldset. */
export function ChoiceGroup({
  legend,
  hint,
  error,
  type,
  name,
  options,
  value,
  onChange,
  columns = 1,
  optional,
}: {
  legend: ReactNode;
  hint?: ReactNode;
  error?: string;
  type: "radio" | "checkbox";
  name: string;
  options: readonly { value: string; label: string; hint?: string }[];
  value: string | string[];
  onChange: (value: string, checked: boolean) => void;
  columns?: 1 | 2 | 3;
  optional?: boolean;
}) {
  const id = useId();
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" }[columns];
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null].filter(Boolean).join(" ");
  return (
    <fieldset aria-describedby={describedBy || undefined} data-invalid={error ? "" : undefined}>
      <legend className="font-bold text-green-900">
        {legend}
        {optional && <span className="font-normal text-ink"> (optional)</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.9375rem]">
          {hint}
        </p>
      )}
      <div className={`mt-3 grid gap-2.5 ${cols}`}>
        {options.map((o) => {
          const checked = Array.isArray(value) ? value.includes(o.value) : value === o.value;
          return (
            <label
              key={o.value}
              className={`group relative flex min-h-14 cursor-pointer items-start gap-3 border-2 px-4 py-3.5 transition-[background-color,border-color,transform] duration-150 active:scale-[0.99] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
                checked ? "border-green-900 bg-green-900 text-sand" : "border-control bg-white text-green-900 hover:border-green-900"
              }`}
            >
              <input
                type={type}
                name={name}
                value={o.value}
                checked={checked}
                onChange={(e) => onChange(o.value, e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
                  type === "radio" ? "rounded-full" : ""
                } ${checked ? "border-gold bg-gold" : "border-control bg-white"}`}
              >
                {checked &&
                  (type === "radio" ? (
                    <span className="h-2 w-2 rounded-full bg-green-900" />
                  ) : (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                      <path d="m3 8.5 3 3 7-7" fill="none" stroke="#16302A" strokeWidth="2.4" />
                    </svg>
                  ))}
              </span>
              <span>
                <span className="block font-bold leading-snug">{o.label}</span>
                {o.hint && <span className={`block text-[0.9375rem] ${checked ? "text-mist" : "text-ink"}`}>{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      <ErrorText id={`${id}-err`}>{error}</ErrorText>
    </fieldset>
  );
}

/** Hidden from people, tempting to bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
