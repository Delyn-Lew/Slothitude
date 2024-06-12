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
    <div className="flex justify-center mt-16">
      {/* Add margin-top to push content down */}
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">My Bookings</h2>
        {bookedClasses.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Instructor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookedClasses.map((booking) => (
                  <tr
                    key={booking._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {booking.classId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.classId?.date
                        ? new Date(booking.classId.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.classId?.date
                        ? new Date(booking.classId.date).toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.classId?.location || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.classId?.instructor || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.classId?.duration || "N/A"}
                    </td>
                    <td className="px-6 py-4">{booking.status || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
}
