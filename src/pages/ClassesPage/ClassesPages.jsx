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

  return (
    <div className="flex justify-center">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">Available Classes</h2>
        {availableClasses.length > 0 ? (
          <ul>
            {availableClasses.map((classItem) => (
              <li
                key={classItem._id}
                onClick={() => handleClickClass(classItem._id)}
                style={{ cursor: "pointer" }}
              >
                {classItem.name}
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
