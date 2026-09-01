"use client";

import React from "react";

type BaseProps = {
  label: string;
  error?: string;
  isTextArea?: boolean;
};

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps | TextAreaProps
>(({ label, error, isTextArea, ...props }, ref) => {
  return (
    <div className="text-white flex flex-col gap-1 w-full">
      <label className="text-[1rem] font-normal">
        {label}
      </label>

      {isTextArea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="w-full min-h-10 max-h-40 placeholder:text-white font-[350] text-[0.8rem] outline-0 p-4 rounded-[0.75rem] bg-[#0D0D0D]"
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className="w-full placeholder:text-white font-[350] text-[0.8rem] outline-0 p-4 rounded-[0.75rem] bg-[#0D0D0D]"
        />
      )}

      {error && (
        <p className="text-red-500 text-[0.75rem]">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";