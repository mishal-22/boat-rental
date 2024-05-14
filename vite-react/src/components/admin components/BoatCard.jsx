import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaUser, FaDollarSign, FaCheck, FaTimes, FaTrash,FaAnchor } from "react-icons/fa";
import axios from "axios";

const BoatCard = ({ boat,onUpdate }) => {
   
  const statusButtonColor = boat.active ? "danger" : "primary";
  const statusButtonText = boat.active ? "Deactivate" : "Activate";

  const handleStatusChange = async () => {
    try {
      // Toggle isActive field
      const updatedBoat = { ...boat, active: !boat.active };
      // Update isActive field in the database
      await axios.get(`http://localhost:8080/boat/active/${boat.id}`);
      // Call the onUpdate callback to update the boat state
      onUpdate(updatedBoat);
    } catch (error) {
      console.error("Error updating boat status:", error);
    }
  };
  const handleDelete = async () => {
    try {
      // Send delete request to the backend
      await axios.delete(`http://localhost:8080/boat/${boat.id}`);
      // Call the onUpdate callback to update the boat state
      onUpdate(null); // Pass null to indicate deletion
    } catch (error) {
      console.error("Error deleting boat:", error);
    }
  };

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
          <Button variant={statusButtonColor} className="me-2" onClick={handleStatusChange}>
            {boat.active ? <FaTimes /> : <FaCheck />}
            &nbsp;{statusButtonText}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash />&nbsp;Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BoatCard;
