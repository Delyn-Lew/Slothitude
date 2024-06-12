import debug from "debug";
import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Input from "../Input/Input";

const log = debug("slothitude:components:SignUpForm");

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "user",
    error: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { ...this.state };
    delete formData.error;
    delete formData.confirm;

    try {
      const user = await signUp(formData);
      log("user: %o", user);
      this.props.setUser(user);
    } catch (error) {
      this.setState({ error: "Sign Up Failed" });
    }
  };

  render() {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <img
            className="mx-auto h-32 w-auto"
            src="/Slothitude.png"
            alt="Slothitude Logo"
          />
          <p className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
            Register here for an account
          </p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={this.handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="relative mt-2">
                <Input
                  type={this.props.showPassword ? "text" : "password"}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {this.props.showPassword ? (
                  <EyeSlashIcon
                    onClick={this.props.togglePW}
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={this.props.togglePW}
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <Input
                  type={this.props.showPassword ? "text" : "password"}
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {this.props.showPassword ? (
                  <EyeSlashIcon
                    onClick={this.props.togglePW}
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={this.props.togglePW}
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  name="role"
                  value={this.state.role}
                  onChange={this.handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="user">User</option>
                  <option value="studioOwner">Studio Owner</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ backgroundColor: "#73576D" }}
              >
                Sign Up
              </button>
            </div>
            {this.state.error && (
              <p className="text-red-600 text-sm text-center mt-4">
                {this.state.error}
              </p>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href=""
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    );
  }
}
