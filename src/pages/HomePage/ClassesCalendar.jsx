import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getToken } from "../../utilities/users-service";
import Modal from "react-modal";
import backgroundImage from "../../../public/SlothitudeBackground.png";

// Initialize localizer using moment.js to interpret dates and times
const localizer = momentLocalizer(moment);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    zIndex: 1001,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const ClassCalendar = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      const response = await fetch("/api/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedClass(classes.find((classItem) => classItem._id === event.id));
    setIsModalOpen(true);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredEvents = selectedLocation
    ? classes.filter((classItem) => classItem.location === selectedLocation)
    : classes;

  const currentDate = new Date();

  const events = filteredEvents.map((classItem) => {
    const startTime = new Date(classItem.date);
    const endTime = moment(startTime)
      .add(classItem.duration, "minutes")
      .toDate();

    const isPastEvent = startTime < currentDate;

    const eventStyle = {
      backgroundColor: isPastEvent ? "#CCA986" : "#73576D",
      color: "#FFFFFF",
      borderRadius: "4px",
      border: "none",
    };

    return {
      id: classItem._id,
      title: classItem.name,
      start: startTime,
      end: endTime,
      style: eventStyle,
    };
  });

  return (
    <div
      className="background-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mt-16">
        {" "}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="location">Filter by Location:</label>
          <select id="location" onChange={handleLocationChange}>
            <option value="">All Locations</option>
            {Array.from(
              new Set(classes.map((classItem) => classItem.location))
            ).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {classes.length === 0 ? (
          <p>No classes available</p>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            // eslint-disable-next-line no-unused-vars
            eventPropGetter={(event, start, end, isSelected) => ({
              style: {
                backgroundColor: event.style.backgroundColor,
                color: event.style.color,
                borderRadius: event.style.borderRadius,
                border: event.style.border,
              },
            })}
          />
        )}
        {selectedClass && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
            contentLabel="Class Details"
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              {selectedClass.name}
            </h2>
            <p>
              <strong>Date:</strong>{" "}
              {moment(selectedClass.date).format("Do MMMM YYYY, h:mm A")}
            </p>
            <p>
              <strong>Description:</strong> {selectedClass.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedClass.location}
            </p>
            <p>
              <strong>Capacity:</strong> {selectedClass.bookedUsers.length}/
              {selectedClass.capacity}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ClassCalendar;
