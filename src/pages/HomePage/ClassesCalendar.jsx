import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getToken } from "../../utilities/users-service";

// Initialize localizer using moment.js to interpret dates and times
const localizer = momentLocalizer(moment);

const ClassCalendar = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch classes from the backend API
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
      console.log("Fetched classes:", data); // Log fetched data
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  console.log("Classes:", classes); // Log classes to verify data

  // Convert start and end dates to JavaScript Date objects
  const events = classes.map((classItem) => ({
    id: classItem._id,
    title: classItem.name,
    start: new Date(classItem.date), // Convert to Date object
    end: new Date(classItem.date), // Convert to Date object
  }));

  console.log("Events:", events); // Log events to verify date conversion
  return (
    <div>
      {classes.length === 0 ? (
        <p>No classes available</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start" // Ensure this matches the property name in the event objects
          endAccessor="end" // Ensure this matches the property name in the event objects
          style={{ height: 500 }}
        />
      )}
    </div>
  );
};

export default ClassCalendar;
