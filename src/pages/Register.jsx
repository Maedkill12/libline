import React, { useState } from "react";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import useSignup from "../hooks/useSignup";

const Register = () => {
  const [username, setUsernmae] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { signup, error, isPending } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isPending) {
      await signup(username, email, password, confirmPass, photoURL);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[400px] py-4 px-4 rounded-2xl shadow-lg shadow-slate-500/40">
        <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
          Register
        </h2>
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
            style="mb-4"
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
            style="mb-4"
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
            style="mb-4"
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
            Sign Up
          </IconButton>
        </form>
        {error && (
          <div className="mt-4 text-center text-red-700 font-bold">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
