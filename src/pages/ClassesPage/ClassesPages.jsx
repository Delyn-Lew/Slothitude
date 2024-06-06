import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { fetchClasses, deleteClass } from "../../utilities/classes-service";

const log = debug("slothitude:pages:ClassesPage");

export default function ClassesPage() {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getClasses = async () => {
      if (isFetched) return;

      try {
        log("Fetching available classes");
        const classes = await fetchClasses();
        log("Fetched classes:", classes);
        setAvailableClasses(classes);
        setIsFetched(true);
      } catch (error) {
        log("Error fetching classes", error);
      }
    };
    getClasses();
  }, [isFetched]);

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

  return (
    <div className="flex justify-center">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">Available Classes</h2>
        <button
          onClick={handleAddClass}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Class
        </button>
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
                  <p>Date: {new Date(classItem.date).toLocaleString()}</p>
                  <p>Time: {new Date(classItem.date).toLocaleTimeString()}</p>
                  <p>Location: {classItem.location}</p>
                  <p>Instructor: {classItem.instructor}</p>
                  <p>Duration: {classItem.duration} minutes</p>
                  <p>Capacity: {classItem.capacity}</p>
                </div>
                <button
                  onClick={() => handleDeleteClass(classItem._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                >
                  Delete
                </button>
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
