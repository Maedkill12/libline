import React from "react";

const Register = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white w-[400px] py-4 px-1 rounded-2xl shadow-lg shadow-slate-500/40">
        <h1 className="text-center text-2xl font-bold font-sans text-slate-800">
          Register
        </h1>
        <form>
          <input name="username" placeholder="Username" />
        </form>
      </div>
    </div>
  );
};

export default Register;
