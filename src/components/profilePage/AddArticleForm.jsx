import React, { useState } from "react";
import useAccessToken from "../../hooks/useAccessToken";
import useArticle from "../../hooks/useArticle";
import IconButton from "../IconButton";
import Input from "../Input";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [docURL, setDocURL] = useState("");
  const [frontPageURL, setFrontPageURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const { error, isLoading, createArticle } = useArticle();
  const { accessToken, username } = useAccessToken();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title,
      year,
      author: username,
      frontPageURL,
      bannerURL,
      docURL,
    };
    await createArticle(data, accessToken);
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
        <Input
          inputOptions={{
            id: "doc-url",
            placeholder: "(https://www.mywebsite.com/mypdf.pdf)",
            type: "url",
            onChange: (e) => setDocURL(e.target.value),
            value: docURL,
          }}
          textLabel="PDF URL"
          required={true}
          extraStyle="mb-4"
        />
        <Input
          inputOptions={{
            id: "front-page-url",
            placeholder: "(https://www.mywebsite.com/frontpage.png)",
            type: "url",
            onChange: (e) => setFrontPageURL(e.target.value),
            value: frontPageURL,
          }}
          textLabel="Front Page Image URL"
          extraStyle="mb-4"
        />
        <Input
          inputOptions={{
            id: "banner-url",
            placeholder: "(https://www.mywebsite.com/banner.png)",
            type: "url",
            onChange: (e) => setBannerURL(e.target.value),
            value: bannerURL,
          }}
          textLabel="Banner Image URL"
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
