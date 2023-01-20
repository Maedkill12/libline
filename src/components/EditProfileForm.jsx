import React, { useState } from "react";
import IconButton from "./IconButton";
import Input from "./Input";
import useUser from "../hooks/useUser";

const EditProfileForm = () => {
  const [username, setUsernmae] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { save, error, isPending } = useUser();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isPending) {
      await save(username, photoURL);
      // setUsernmae("");
      // setPhotoURL("");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          inputOptions={{
            id: "username",
            placeholder: "Type your username",
            onChange: (e) => setUsernmae(e.target.value),
            value: username,
          }}
          textLabel={"Username"}
          style="mb-4"
        />
        <Input
          inputOptions={{
            id: "photo-url",
            placeholder: "mywebsite.com/images/user.png",
            type: "url",
            onChange: (e) => setPhotoURL(e.target.value),
            value: photoURL,
          }}
          textLabel="Profile Photo URL"
          style={"mb-4"}
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

export default EditProfileForm;
