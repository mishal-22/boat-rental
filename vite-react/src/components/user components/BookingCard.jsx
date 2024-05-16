import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUser, FaDollarSign, FaTrash, FaAnchor } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./bookingCard.css";

const BookingCard = ({ booking, onCancelBooking }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={`/${booking.image}`}
        alt={booking.boatName}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-auto">
          <Card.Title className="fw-bold" style={{ color: "#007bff" }}>
            {booking.boatName}
          </Card.Title>
          <Card.Text className="text-muted mb-2">
            {booking.description}
          </Card.Text>
          <div className="booking-details">
            <div className="d-flex align-items-center">
              <FaUser className="me-1" />
              <span className="me-3">{booking.ownerName}</span>
              <FaAnchor className="me-1" />
              <span className="me-3">{booking.capacity} Capacity</span>
              <FaDollarSign className="me-1" />
              <span>{booking.price} / per hour</span>
            </div>
            <div className="booking-details">
              <div className="booking-section">
                <div className="booking-title">Booked by:</div>
                <div className="booking-info">{booking.name}</div>
              </div>
              <div className="booking-section">
                <div className="booking-title">Email:</div>
                <div className="booking-info">{booking.email}</div>
              </div>
              <div className="booking-section">
                <div className="booking-title">Phone:</div>
                <div className="booking-info">{booking.phone}</div>
              </div>
              <div className="booking-section">
                <div className="booking-title">Date:</div>
                <div className="booking-info">{booking.date}</div>
              </div>
              <div className="booking-section">
                <div className="booking-title">Start Time:</div>
                <div className="booking-info">{booking.startTime}</div>
              </div>
              <div className="booking-section">
                <div className="booking-title">End Time:</div>
                <div className="booking-info">{booking.endTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <Button
            variant="danger"
            onClick={() => onCancelBooking(booking.bookedId)}
          >
            <FaTrash />
            &nbsp;Cancel Booking
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
