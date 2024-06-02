import debug from "debug";
import { useNavigate } from "react-router-dom";
import { login } from "../../utilities/users-service";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Input from "../Input/Input";

const log = debug("slothitude:components:LoginForm");

export default function LoginForm({
  setUser,
  onSignUp,
  showPassword,
  togglePW,
}) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    log("data: %o", data);
    const { email, password } = data;
    try {
      const user = await login(email, password);
      setUser(user);
      navigate("/dashboard");
      setError("");
    } catch (error) {
      setError("Login Failed - check email and password");
    }
  };

  return (
    <form
      className="flex min-h-screen items-center justify-center"
      onSubmit={handleSubmit}
    >
      <fieldset className="bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5">
        <legend className="font-black block mb-2 text-sm  text-gray-900">
          Login
        </legend>

        <label className="drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
          Email:
          <Input type="email" name="email" />
        </label>
        <div className="relative">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center">
            Password:
            <Input type={showPassword ? "text" : "password"} name="password" />
            {showPassword ? (
              <EyeSlashIcon
                onClick={togglePW}
                className="h-4 w-4 absolute right-3 top-12"
              />
            ) : (
              <EyeIcon
                onClick={togglePW}
                className="h-4 w-4 absolute right-3 top-12"
              />
            )}
          </label>
        </div>
        <button
          className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
          type="submit"
        >
          Login
        </button>
        {error && (
          <div className="flex justify-start">
            {" "}
            <p className="w-full text-red-600">{error}</p>
          </div>
        )}
        <div className="flex justify-center flex-col items-center">
          <p className="text-xs mb-1 font-semibold">Register Here!</p>
          <button
            onClick={onSignUp}
            className="cursor-pointer drop-shadow-md w-20 border-1 border-opacity-40 border-slate-400 text-purple-60 rounded-md hover:drop-shadow-2xl hover:bg-neutral-200 shadow-black-700 text-purple-600 text-12px text-center"
          >
            Sign Up
          </button>
        </div>
      </fieldset>
    </form>
  );
}
