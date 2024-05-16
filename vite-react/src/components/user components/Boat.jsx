import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaUser, FaDollarSign, FaTrash, FaAnchor } from "react-icons/fa";
import { Link } from "react-router-dom";

const Boat = ({ boat }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={`/${boat.image}`} alt={boat.boatName} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-auto">
          <Card.Title className="fw-bold" style={{ color: "#007bff" }}>
            {boat.boatName}
          </Card.Title>
          <Card.Text className="text-muted mb-2">{boat.description}</Card.Text>
          <div className="d-flex align-items-center">
            <FaUser className="me-1" />
            <span className="me-3">{boat.ownerName}</span>
            <FaAnchor className="me-1" />
            <span className="me-3">{boat.capacity} Capacity</span>
            <FaDollarSign className="me-1" />
            <span>{boat.price} / per hour</span>
          </div>
        </div>
        <div className="text-center mt-auto">
          <Link to={`/user/booking/${boat.id}`} className="btn btn-primary">
            <FaAnchor />
            &nbsp;Book Now!
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Boat;
