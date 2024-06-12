import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { fetchClasses, deleteClass } from "../../utilities/classes-service";
import { createBooking, cancelBooking } from "../../utilities/bookings-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const log = debug("slothitude:pages:ClassesPage");

export default function ClassesPage({ user }) {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const navigate = useNavigate();
  const userId = user ? user._id : null;
  const role = user ? user.role : null;

  useEffect(() => {
    const isClassExpired = (classItem) => {
      const classDateTime = new Date(classItem.date);
      const now = new Date();
      return classDateTime < now;
    };

    const getClasses = async () => {
      try {
        log("Fetching available classes");
        const classes = await fetchClasses();
        log("Fetched classes:", classes);

        const filteredClasses = classes.filter(
          (classItem) => !isClassExpired(classItem)
        );
        setAvailableClasses(filteredClasses);

        const userBookedClasses = filteredClasses
          .filter((classItem) => classItem.bookedUsers.includes(userId))
          .map((classItem) => classItem._id);
        setBookedClasses(userBookedClasses);
      } catch (error) {
        log("Error fetching classes", error);
      }
    };
    getClasses();
  }, [userId]);

  const handleAddClass = () => {
    navigate("/add-class");
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      setAvailableClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== classId)
      );
      toast.success("Class deleted successfully");
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Error deleting class", {
        position: "bottom-right",
      });
    }
  };

  const handleBookClass = async (classId) => {
    try {
      const classToBook = availableClasses.find(
        (classItem) => classItem._id === classId
      );

      if (!classToBook) {
        console.error("Class not found.");
        toast.error("Class not found.");
        return;
      }

      if (bookedClasses.includes(classId)) {
        console.log("You are already booked into this class.");
        toast.info("You are already booked into this class.");
        return;
      }

      if (classToBook.bookedUsers.length >= classToBook.capacity) {
        console.log("Class is already at full capacity.");
        toast.error("Class is already at full capacity.", {
          position: "bottom-right",
        });
        return;
      }

      const bookingData = {
        classId,
        userId,
        status: "booked",
      };

      await createBooking(bookingData);
      log("Class booked successfully");
      toast.success("Class booked successfully", {
        position: "bottom-right",
      });

      setBookedClasses((prevBookedClasses) => [...prevBookedClasses, classId]);
    } catch (error) {
      console.error("Error booking class:", error);
      toast.error("Error booking class", {
        position: "bottom-right",
      });
    }
  };

  const handleCancelBooking = async (classId) => {
    try {
      await cancelBooking(classId, userId);
      log("Booking canceled successfully");
      toast.success("Booking canceled successfully", {
        position: "bottom-right",
      });

      setBookedClasses((prevBookedClasses) =>
        prevBookedClasses.filter((id) => id !== classId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Error canceling booking");
    }
  };

  return (
    <div className="flex justify-center mt-16 space-y-8">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <ToastContainer limit={1} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md p-4"
              >
                <h3 className="font-bold">{classItem.name}</h3>
                <p>{classItem.description}</p>
                <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
                <p>Time: {new Date(classItem.date).toLocaleTimeString()}</p>
                <p>Location: {classItem.location}</p>
                <p>Instructor: {classItem.instructor}</p>
                <p>Duration: {classItem.duration} minutes</p>
                <p>Capacity: {classItem.capacity}</p>
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
              </div>
            ))}
          </div>
        ) : (
          <p>No available classes found.</p>
        )}
      </section>
    </div>
  );
}
