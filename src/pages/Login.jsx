import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[400px] py-4 px-4 rounded-2xl shadow-lg shadow-slate-500/40">
        <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
          Login
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
