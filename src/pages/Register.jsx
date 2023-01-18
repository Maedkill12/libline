import React, { useState } from "react";
import IconButton from "../components/IconButton";
import Input from "../components/Input";

const Register = () => {
  const [username, setUsernmae] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[400px] py-4 px-4 rounded-2xl shadow-lg shadow-slate-500/40">
        <h1 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
          Register
        </h1>
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
              type: "confirmPassword",
              onChange: (e) => setConfirmPass(e.target.value),
              value: confirmPass,
            }}
            textLabel="Confirm Password"
            required={true}
            style="mb-4"
          />
          <IconButton style={"justify-center w-full"} type="submit">
            Sign Up
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
