import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { URL_API } from "../constants";

const Register = () => {
  const [username, setUsernmae] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPass) {
      setError("All fields are required");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError("Username length must be between 3 and 20 characters");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("Invalid email");
      return;
    }

    if (password !== confirmPass) {
      setError("Password doesn't match");
      return;
    }

    try {
      const response = await axios.post(
        `${URL_API}/auth/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      const { data } = response;
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      const msg = error.response.data.err;
      setError(msg);
    }
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
              type: "password",
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
