import { useState } from "react";
import { createClass } from "../../utilities/classes-service";

export default function AddClassForm() {
  const [classData, setClassData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    instructor: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClass(classData);
      setClassData({
        name: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        instructor: "",
        location: "",
        capacity: "",
      });
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={classData.name}
        onChange={handleChange}
        placeholder="Class Name"
        required
      />
      <input
        type="text"
        name="description"
        value={classData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        name="date"
        value={classData.date}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="duration"
        value={classData.duration}
        onChange={handleChange}
        placeholder="Duration (minutes)"
        required
      />
      <input
        type="text"
        name="instructor"
        value={classData.instructor}
        onChange={handleChange}
        placeholder="Instructor"
        required
      />
      <input
        type="text"
        name="location"
        value={classData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="number"
        name="capacity"
        value={classData.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        required
      />
      <button type="submit">Add Class</button>
    </form>
  );
}
