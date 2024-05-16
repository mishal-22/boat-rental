import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminBookingCard from "./AdminBookingCard";

function ShowBooking() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/booking/admin-view`,
        {
          params: {
            username: sessionStorage.getItem("username"),
          },
        }
      );
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching booked details:", error);
    }
  };

  return (
    <div className="container">
      <h1></h1>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.bookedId} className="col-md-4 mb-4">
            <AdminBookingCard booking={booking} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowBooking;
