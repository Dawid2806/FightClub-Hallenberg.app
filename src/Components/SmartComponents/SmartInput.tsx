import React from "react";

import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  autoComplete?: string;
}

export const SmartInput = ({
  name,
  label,
  type,
  placeholder,
  autoComplete,
}: InputProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <div className="mt-4">
      <div className="sm:col-span-4">
        <label htmlFor={name} className="block text-sm font-medium leading-6 ">
          {label}
        </label>

        <div className="">
          <div className="flex text-black rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              autoComplete={autoComplete}
              type={type}
              {...register(name)}
              className="block  flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
