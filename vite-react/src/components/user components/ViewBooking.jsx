import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";

function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/booking/view`, {
        params: {
          username: sessionStorage.getItem("username"),
        },
      });
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching booked details:", error);
    }
  };
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/booking/${bookingId}`);
      // After successfully canceling the booking, update the state to reflect the changes
      setBookings(bookings.filter((booking) => booking.bookedId !== bookingId));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };
  return (
    <div className="container">
      <h1></h1>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking.bookedId} className="col-md-4 mb-4">
            <BookingCard booking={booking} onCancelBooking={cancelBooking} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBooking;
