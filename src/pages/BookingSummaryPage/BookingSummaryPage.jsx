import { useState, useEffect } from "react";
import debug from "debug";
import { fetchUserBookings } from "../../utilities/bookings-service";

const log = debug("slothitude:pages:BookingSummaryPage");

export default function BookingSummaryPage({ user }) {
  const [bookedClasses, setBookedClasses] = useState([]);
  const userId = user ? user._id : null;

  useEffect(() => {
    const getUserBookings = async () => {
      try {
        log("Fetching user bookings");
        const bookings = await fetchUserBookings(userId);
        log("Fetched bookings:", bookings);
        setBookedClasses(bookings);
      } catch (error) {
        log("Error fetching user bookings", error);
      }
    };
    getUserBookings();
  }, [userId]);

  return (
    <div className="flex justify-center">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">My Bookings</h2>
        {bookedClasses.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Duration</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {bookedClasses.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-4 py-2">
                    {booking.classId?.name || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.classId?.date
                      ? new Date(booking.classId.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.classId?.date
                      ? new Date(booking.classId.date).toLocaleTimeString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.classId?.duration || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.classId?.location || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.classId?.instructor || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
}
