import React, { useEffect, useState } from "react";
import { Card, Button,ToastContainer,
  Toast, } from "react-bootstrap";
import {
  FaUser,
  FaDollarSign,
  FaCheck,
  FaTimes,
  FaTrash,
  FaAnchor,
} from "react-icons/fa";
import axios from "axios";

const BoatCard = ({ boat, onUpdate }) => {
  const statusButtonColor = boat.active ? "danger" : "primary";
  const statusButtonText = boat.active ? "Deactivate" : "Activate";
  const [flagCheck, setFlagCheck] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Something went wrong!");

  const handleStatusChange = async () => {
    // console.log(boat.booked)
    try {
      if (boat.booked) {
        // console.log()
        setToast(true)
        setFlagCheck(false)
        setToastMessage("Boat Already booked, You can't deactivate")
        return;
      }
      // Toggle isActive field
      const updatedBoat = { ...boat, active: !boat.active };
      // Update isActive field in the database
      await axios.get(`http://localhost:8080/boat/active/${boat.id}`);
      setToast(true)
        setFlagCheck(true)
        setToastMessage("Boat Deaci=tivated!")
      // Call the onUpdate callback to update the boat state
      onUpdate(updatedBoat);
    } catch (error) {
      console.error("Error updating boat status:", error);
    }
  };
  const handleDelete = async () => {
    try {
      if (boat.booked) {
        // console.log()
        setToast(true)
        setFlagCheck(false)
        setToastMessage("Boat Already booked, You can't Delete")
        return;
      }
      // Send delete request to the backend
      await axios.delete(`http://localhost:8080/boat/${boat.id}`);
      setToast(true)
        setFlagCheck(true)
        setToastMessage("Boat deleted!")
      // Call the onUpdate callback to update the boat state
      onUpdate(null); // Pass null to indicate deletion
    } catch (error) {
      console.error("Error deleting boat:", error);
    }
  };

  return (
    <div>
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
          <Button
            variant={statusButtonColor}
            className="me-2"
            onClick={handleStatusChange}
          >
            {boat.active ? <FaTimes /> : <FaCheck />}
            &nbsp;{statusButtonText}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash />
            &nbsp;Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
     {/*-----------------  for Toast Message----------- */}
     <Card.Body>
     <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
       <Toast
         id="successToast"
         className={`toast colored-toast bg-${
           flagCheck ? "success" : "danger"
         }-transparent`}
         role="alert"
         aria-live="assertive"
         onClose={() => setToast(false)}
         show={toast}
         delay={3000}
         autohide
         aria-atomic="true"
       >
         <Toast.Header
           className={`bg-${
             flagCheck ? "success" : "danger"
           } text-fixed-white`}
         >
           <strong className="me-auto">
             {flagCheck ? "Success" : "Error"}
           </strong>
         </Toast.Header>
         <Toast.Body>
           {toastMessage}
         </Toast.Body>
       </Toast>
     </ToastContainer>
   </Card.Body>
   </div>
  );
};

export default BoatCard;
