import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  ToastContainer,
  Toast,
} from "react-bootstrap";
function Register() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [gender, SetGender] = useState("");
  const [role,setRole]=useState("user")
  const navigate = useNavigate();
  const [flagCheck, setFlagCheck] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username, email, password, gender, role };
    fetch("http://localhost:8080/boat-life/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data == "User already Exist") {
          alert("Email already Registered ");
          SetUsername(" "), SetEmail(""), SetPassword(""), SetGender(""),setRole("user");
          navigate("/login");
          return;
        } else {
          console.log("User registered Successfully", data);
          setFlagCheck(true);
          setToast(true)
          SetUsername(" "), SetEmail(""), SetPassword(""), SetGender(""),setRole("user");
          const timeoutId = setTimeout(() => {
            
            
            navigate("/login");

            
          }, 1000);
          // Clear the timeout
          return () => clearTimeout(timeoutId);
          
        }
      });
  };
  return (
    <div className="user-registration">
      <form onSubmit={handleSubmit}>
        <label>Username : </label>
        <input
          type="text"
          name="usename"
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          required
        />{" "}
        <br />
        <br />
        <label>Email : </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
          required
        />{" "}
        <br />
        <br />
        <label>Password : </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          required
        />{" "}
        <br />
        <br />
        <label>
          Gender : {"      "}
          <input
            type="radio"
            value="male"
            name="gender"
            onChange={(e) => SetGender(e.target.value)}
            checked={gender === "male"}
            required
          />
          {"   "}
          Male{"   "}
          <input
            type="radio"
            value="female"
            name="gender"
            onChange={(e) => SetGender(e.target.value)}
            checked={gender === "female"}
            required
          />{" "}
          Female
        </label>
        <br />
        <br />
        <label>Role : </label>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        </select>
        <br />
        <input type="submit" value="REGISTER" />
      </form>

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
              {flagCheck ? "Registration Success" : "Something Went Wrong"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Card.Body>
    </div>
  );
}

export default Register;
