import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import IconButton from "../IconButton";
import Input from "../Input";

const LoginForm = () => {
  const [username, setUsernmae] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isLoading) {
      const data = await login(username, password);
      if (data) {
        navigate("/");
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
        <IconButton
          extraStyle={`justify-center w-full ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
          type="submit"
        >
          Login
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

export default LoginForm;
