import React from "react";
import RegisterForm from "../components/registerPage/RegisterForm";

const Register = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[400px] py-4 px-4 rounded-2xl shadow-lg shadow-slate-500/40">
        <h2 className="text-center text-2xl font-bold font-sans text-slate-800 mb-4">
          Register
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
