import { bookings, featuredData, totalVisit } from "../variable";
import StatCard from "./comps/Card";
import FeaturedCard from "./comps/FeaturedCard";

const BookingLapangan = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex    gap-4">
        {totalVisit.map((stat, index) => (
          <div key={index} className="w-full">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-md border">
        <h1 className="text-2xl font-bold mb-4">Featured Places</h1>
        <div className="flex gap-4 ">
          {featuredData.map((item, index) => (
            <FeaturedCard
              key={index}
              image={item.image}
              title={item.title}
              location={item.location}
            />
          ))}
        </div>
      </div>
      <div className="bg-white overflow-x-auto border rounded-lg">
        <table className="table  ">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Court Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Customer Name</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Special Requests</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.courtName}</td>
                <td>{booking.date}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
                <td>{booking.duration}</td>
                <td>{booking.customerName}</td>
                <td>{booking.contactInfo}</td>
                <td>{booking.status}</td>
                <td>{booking.price.toLocaleString("id-ID")}</td>
                <td>{booking.paymentStatus}</td>
                <td>{booking.paymentMethod}</td>
                <td>{booking.specialRequests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default BookingLapangan;
