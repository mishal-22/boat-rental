import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Boat from "./Boat";

function ShowBoatCard() {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    fetchBoats();
  }, []);

  const fetchBoats = async () => {
    try {
      const response = await axios.get("http://localhost:8080/boat/all");
      console.log(response.data.map((boat) => boat.active));
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
      {boats.map(
        (boat) =>
          boat.active && (
            <Col key={boat.id}>
              <Boat boat={boat} onUpdate={updateBoat} />
            </Col>
          )
      )}
    </Row>
  );
}

export default ShowBoatCard;
