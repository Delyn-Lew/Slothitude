import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import debug from "debug";
import { fetchClassById, deleteClass } from "../../utilities/classes-service";
import { createBooking } from "../../utilities/bookings-service";

const log = debug("slothitude:pages:ClassDetails");

export default function ClassDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const getClassDetails = async () => {
      try {
        log("Fetching class details for ID:", id);
        const classData = await fetchClassById(id);
        log("Fetched class details:", classData);
        setClassDetails(classData);
      } catch (error) {
        log("Error fetching class details", error);
      }
    };
    getClassDetails();
  }, [id]);

  const handleDeleteClass = async () => {
    try {
      await deleteClass(id);
      navigate("/classes/avail");
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleBookClass = async () => {
    try {
      const bookingData = {
        classId: id,
        userId: user._id,
        status: "booked",
      };
      await createBooking(bookingData);
      log("Class booked successfully");
    } catch (error) {
      console.error("Error booking class:", error);
    }
  };

  if (!classDetails) {
    return <p>Loading class details...</p>;
  }

  return (
    <div className="flex justify-center">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">{classDetails.name}</h2>
        <p>{classDetails.description}</p>
        <p>Date: {new Date(classDetails.date).toLocaleDateString()}</p>
        <p>Time: {new Date(classDetails.date).toLocaleTimeString()}</p>
        <p>Location: {classDetails.location}</p>
        <p>Instructor: {classDetails.instructor}</p>
        <p>Duration: {classDetails.duration} minutes</p>
        <p>Capacity: {classDetails.capacity}</p>

        <div className="flex space-x-2 mt-4">
          {user.role === "studioOwner" && (
            <button
              onClick={handleDeleteClass}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Class
            </button>
          )}
          {user.role === "user" && (
            <button
              onClick={handleBookClass}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Book Class
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
