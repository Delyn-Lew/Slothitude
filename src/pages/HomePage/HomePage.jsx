import { Outlet } from "react-router-dom";
import ClassesCalendar from "./ClassesCalendar";

export default function HomePage() {
  return (
    <div className="pt-16">
      <div className="flex items-center justify-center my-2">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Slothitude
        </h1>
        <img
          src="Slothitude.png"
          className="ml-4"
          alt="Slothitude Logo"
          style={{ height: "90px", width: "auto" }}
        />
      </div>
      <ClassesCalendar />
      <Outlet />
    </div>
  );
}
