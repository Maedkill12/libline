import React, { useState } from "react";
import IconButton from "../IconButton";
import Input from "../Input";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { URL_API } from "../../constants";
import useAccessToken from "../../hooks/useAccessToken";
import { useNavigate } from "react-router-dom";
import useAutologin from "../../hooks/useAutologin";

const EditProfileForm = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { request, error, isLoading } = useAxiosFetch();
  const { username: userLogged, accessToken } = useAccessToken();
  const { login } = useAutologin();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {};
    if (username) {
      data.username = username;
    }
    if (photoURL) {
      data.photoURL = photoURL;
    }
    await request(
      `${URL_API}/users/${userLogged}`,
      {
        data,
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      "patch"
    );
    if (!error) {
      await login();
      navigate(`/profile/${data.username}`);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          inputOptions={{
            id: "username",
            placeholder: "Type your username",
            onChange: (e) => setUsername(e.target.value),
            value: username,
          }}
          textLabel={"Username"}
          extraStyle={"mb-4"}
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
          extraStyle={"mb-4"}
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

export default EditProfileForm;
