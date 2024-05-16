import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BoatAdditionForm() {
  const [boatData, setBoatData] = useState({
    boatName: "",
    ownerName: "",
    capacity: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoatData({
      ...boatData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });

    if (name === "capacity" && isNaN(value)) {
      setErrors({
        ...errors,
        capacity: "Capacity must be a number",
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setErrors({
      ...errors,
      image: "", // Clear image error message when selecting a file
    });

    // If no file is selected, reset the file state
    if (!selectedFile) {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!boatData.boatName) {
      validationErrors.boatName = "Please enter boat name";
    }
    if (!boatData.ownerName) {
      validationErrors.ownerName = "Please enter owner name";
    }
    if (!boatData.capacity) {
      validationErrors.capacity = "Please enter capacity";
    }
    if (!boatData.description) {
      validationErrors.description = "Please enter description";
    }
    if (!file) {
      validationErrors.image = "Please select an image";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("boatName", boatData.boatName);
    formData.append("ownerName", boatData.ownerName);
    formData.append("capacity", boatData.capacity);
    formData.append("description", boatData.description);

    try {
      const response = fetch("http://localhost:8080/boat", {
        method: "POST",
        body: formData,
      });
      // const data = await response.json();

      if (response.ok) {
        // Boat added successfully
        toast.success("Boat added successfully");
      } else {
        // Something went wrong
        toast.error("Something went wrong");
      }
      // console.log(data); // Handle response from backend
    } catch (error) {
      console.error("Error:", error);
    }

    // Reset the form fields
    setBoatData({
      boatName: "",
      ownerName: "",
      capacity: "",
      description: "",
    });
    setFile(null);
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Boat Name:
          <input
            type="text"
            name="boatName"
            value={boatData.boatName}
            onChange={handleChange}
          />
          {errors.boatName && <span className="error">{errors.boatName}</span>}
        </label>
        <label>
          Owner Name:
          <input
            type="text"
            name="ownerName"
            value={boatData.ownerName}
            onChange={handleChange}
          />
          {errors.ownerName && (
            <span className="error">{errors.ownerName}</span>
          )}
        </label>
        <label>
          Capacity:
          <input
            type="text"
            name="capacity"
            value={boatData.capacity}
            onChange={handleChange}
          />
          {errors.capacity && <span className="error">{errors.capacity}</span>}
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={boatData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </label>
        <label>
          Upload Image:
          <input type="file" onChange={handleImageChange} />
          <br />
          {errors.image && <span className="error">{errors.image}</span>}
        </label>
        <div className="center">
          <button type="submit">Add Boat</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default BoatAdditionForm;
