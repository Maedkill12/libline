import React from "react";

const Input = ({ style, textLabel, required = false, inputOptions = {} }) => {
  return (
    <>
      {textLabel && (
        <label
          className={`font-snas text-lg text-slate-800 ${
            required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }`}
          htmlFor={inputOptions?.id}
        >
          {textLabel}
        </label>
      )}
      <input
        className={`outline-none border-2 border-solid border-slate-800 w-full  p-1 rounded-lg before:c ${style}`}
        required={required}
        {...inputOptions}
      />
    </>
  );
};

export default Input;
