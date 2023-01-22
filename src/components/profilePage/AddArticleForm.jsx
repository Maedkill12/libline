import React, { useState } from "react";
import { URL_API } from "../../constants";
import useAccessToken from "../../hooks/useAccessToken";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import IconButton from "../IconButton";
import Input from "../Input";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const { error, isLoading, request } = useAxiosFetch();
  const { accessToken, username } = useAccessToken();

  const submitHandler = async (e) => {
    e.preventDefault();

    await request(
      `${URL_API}/articles`,
      {
        data: { title, year, author: username },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      "post"
    );
    setTitle("");
    setYear("");
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
          extraStyle="mb-4"
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
          extraStyle="mb-4"
        />

        <IconButton
          extraStyle={`justify-center w-full ${
            isLoading ? "cursor-not-allowed" : ""
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
