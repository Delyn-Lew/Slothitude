import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getToken } from "../../utilities/users-service";

// initializes the localizer using moment.js to interpret dates and times
const localizer = momentLocalizer(moment);

export default function ClassesCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = getToken(); // Get the token from local storage
        if (!token) throw new Error("No token found");

        const response = await fetch("/api/classes/booked", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const classes = await response.json();
        const eventList = classes.map((classItem) => ({
          title: classItem.name,
          start: new Date(classItem.date),
          end: new Date(classItem.date),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#3174ad";
    if (isSelected) {
      backgroundColor = "#f00"; // Change color if selected
    }
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: "0.25rem",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    return {
      style: style,
    };
  };

  return (
    <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Booked Classes</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
