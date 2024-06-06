import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { fetchClasses } from "../../utilities/classes-service";

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
                onClick={() => handleClickClass(classItem._id)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <h3>{classItem.name}</h3>
                <p>{classItem.description}</p>
                <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
                <p>Time: {new Date(classItem.date).toLocaleTimeString()}</p>
                <p>Location: {classItem.location}</p>
                <p>Instructor: {classItem.instructor}</p>
                <p>Duration: {classItem.duration} minutes</p>
                <p>Capacity: {classItem.capacity}</p>
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
