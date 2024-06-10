import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { fetchClasses, deleteClass } from "../../utilities/classes-service";
import { createBooking, cancelBooking } from "../../utilities/bookings-service";

const log = debug("slothitude:pages:ClassesPage");

export default function ClassesPage({ user }) {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const navigate = useNavigate();
  const userId = user ? user._id : null;
  const role = user ? user.role : null;

  useEffect(() => {
    const getClasses = async () => {
      try {
        log("Fetching available classes");
        const classes = await fetchClasses();
        log("Fetched classes:", classes);
        setAvailableClasses(classes);

        // Set booked classes
        const userBookedClasses = classes
          .filter((classItem) => classItem.bookedUsers.includes(userId))
          .map((classItem) => classItem._id);
        setBookedClasses(userBookedClasses);
      } catch (error) {
        log("Error fetching classes", error);
      }
    };
    getClasses();
  }, [userId]);

  const handleClickClass = (classId) => {
    navigate(`/classes/${classId}`);
  };

  const handleAddClass = () => {
    navigate("/add-class");
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      setAvailableClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== classId)
      );
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleBookClass = async (classId) => {
    try {
      const classToBook = availableClasses.find(
        (classItem) => classItem._id === classId
      );

      if (!classToBook) {
        console.error("Class not found.");
        alert("Class not found.");
        return;
      }

      if (bookedClasses.includes(classId)) {
        console.log("You are already booked into this class.");
        alert("You are already booked into this class.");
        return;
      }

      if (classToBook.bookedUsers.length >= classToBook.capacity) {
        console.log("Class is already at full capacity.");
        alert("Class is already at full capacity.");
        return;
      }

      const bookingData = {
        classId,
        userId,
        status: "booked",
      };

      await createBooking(bookingData);
      log("Class booked successfully");
      alert("Class booked successfully!");

      setBookedClasses((prevBookedClasses) => [...prevBookedClasses, classId]);
    } catch (error) {
      console.error("Error booking class:", error);
    }
  };

  const handleCancelBooking = async (classId) => {
    try {
      await cancelBooking(classId, userId);
      log("Booking canceled successfully");

      setBookedClasses((prevBookedClasses) =>
        prevBookedClasses.filter((id) => id !== classId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">Available Classes</h2>
        {role === "studioOwner" && (
          <button
            onClick={handleAddClass}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Class
          </button>
        )}
        {availableClasses.length > 0 ? (
          <ul>
            {availableClasses.map((classItem) => (
              <li
                key={classItem._id}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div
                  onClick={() => handleClickClass(classItem._id)}
                  style={{ cursor: "pointer" }}
                  className="flex-1"
                >
                  <h3 className="font-bold">{classItem.name}</h3>
                  <p>{classItem.description}</p>
                  <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
                  <p>Time: {new Date(classItem.date).toLocaleTimeString()}</p>
                  <p>Location: {classItem.location}</p>
                  <p>Instructor: {classItem.instructor}</p>
                  <p>Duration: {classItem.duration} minutes</p>
                  <p>Capacity: {classItem.capacity}</p>
                </div>
                <div className="flex space-x-2">
                  {role === "studioOwner" && (
                    <button
                      onClick={() => handleDeleteClass(classItem._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                  {role !== "studioOwner" &&
                    (bookedClasses.includes(classItem._id) ? (
                      <button
                        onClick={() => handleCancelBooking(classItem._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBookClass(classItem._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Book
                      </button>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available classes found.</p>
        )}
      </section>
    </div>
  );
}
