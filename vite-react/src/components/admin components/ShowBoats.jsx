import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import BoatCard from "./BoatCard";

function ShowBoats() {
    const [boats, setBoats] = useState([]);

    useEffect(() => {
        fetchBoats();
      }, []);
    
      const fetchBoats = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/boat?username=${sessionStorage.getItem("username")}`);
          setBoats(response.data);
        } catch (error) {
          console.error("Error fetching boats:", error);
        }
      };
    
      const updateBoat = (updatedBoat) => {
        if (updatedBoat) {
          const updatedBoats = boats.map((boat) =>
            boat.id === updatedBoat.id ? updatedBoat : boat
          );
          setBoats(updatedBoats);
        } else {
          // If updatedBoat is null, it means the boat was deleted
          fetchBoats(); // Fetch updated list of boats from the server
        }
      };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {boats.map((boat) => (
        <Col key={boat.id}>
          <BoatCard boat={boat} onUpdate={updateBoat} />
        </Col>
      ))}
      
    </Row>
  )
}

export default ShowBoats