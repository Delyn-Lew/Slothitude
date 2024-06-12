import { Outlet } from "react-router-dom";
import ClassesCalendar from "./ClassesCalendar";

export default function HomePage() {
  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold text-center my-4">
        Welcome to Slothitude
      </h1>
      <ClassesCalendar />
      <Outlet />
    </div>
  );
}
