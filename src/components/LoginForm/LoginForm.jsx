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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <img
          className="mx-auto h-32 w-auto"
          src="/Slothitude.png"
          alt="Slothitude Logo"
        />
        <p className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
          Sign in to your account
        </p>
      </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <Input
                type="email"
                name="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="relative mt-2">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 pr-0 flex items-center">
                {showPassword ? (
                  <EyeSlashIcon
                    onClick={togglePW}
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={togglePW}
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            onClick={onSignUp}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Register here!
          </a>
        </p>
      </div>
    </div>
  );
}
