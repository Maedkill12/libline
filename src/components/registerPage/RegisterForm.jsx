import React, { useState } from "react";
import IconButton from "../IconButton";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RegisterForm = () => {
  const [username, setUsernmae] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { error, isLoading, signup } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      const data = await signup(
        username,
        email,
        password,
        confirmPass,
        photoURL
      );
      if (data) {
        navigate("/login");
      }
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
          required={true}
          extraStyle="mb-4"
        />
        <Input
          inputOptions={{
            id: "email",
            placeholder: "Type your email",
            type: "email",
            onChange: (e) => setEmail(e.target.value),
            value: email,
          }}
          textLabel="Email"
          required={true}
          extraStyle="mb-4"
        />
        <Input
          inputOptions={{
            id: "password",
            placeholder: "Type your password",
            type: "password",
            onChange: (e) => setPassword(e.target.value),
            value: password,
          }}
          textLabel="Password"
          required={true}
          extraStyle="mb-4"
        />
        <Input
          inputOptions={{
            id: "confirmPassword",
            placeholder: "Confirm your password",
            type: "password",
            onChange: (e) => setConfirmPass(e.target.value),
            value: confirmPass,
          }}
          textLabel="Confirm Password"
          required={true}
          extraStyle="mb-4"
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
          Sign Up
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

export default RegisterForm;
