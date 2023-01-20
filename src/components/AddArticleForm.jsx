import React, { useEffect, useState } from "react";
import useArticle from "../hooks/useArticle";
import IconButton from "./IconButton";
import Input from "./Input";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const { error, isPending, save } = useArticle();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isPending) {
      await save(title, year);
      setTitle("");
      setYear("");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          inputOptions={{
            id: "title",
            placeholder: "Type your title",
            onChange: (e) => setTitle(e.target.value),
            value: title,
          }}
          textLabel={"Title"}
          required={true}
          style="mb-4"
        />
        <Input
          inputOptions={{
            id: "year",
            placeholder: "Year of publication",
            type: "number",
            onChange: (e) => setYear(e.target.value),
            value: year,
            max: new Date().getFullYear(),
          }}
          textLabel="Year"
          required={true}
          style="mb-4"
        />

        <IconButton
          style={`justify-center w-full ${
            isPending ? "cursor-not-allowed" : ""
          }`}
          type="submit"
        >
          Save
        </IconButton>
      </form>
      {error && (
        <div className="mt-4 text-center text-red-700 font-bold">
          Error: {error}
        </div>
      )}
    </>
  );
};

export default AddArticleForm;
