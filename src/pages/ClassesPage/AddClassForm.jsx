import { useState } from "react";
import { createClass } from "../../utilities/classes-service";

export default function AddClassForm() {
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const classData = { name: className, date };
      await createClass(classData);
      setClassName("");
      setDate("");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Class Name"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Class</button>
    </form>
  );
}
