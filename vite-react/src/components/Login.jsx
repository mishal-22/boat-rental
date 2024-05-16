import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [flagCheck, setFlagCheck] = useState(false);
  const [toast, setToast] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/boat-life/login?email=${email}&password=${password}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (data === "admin") {
          // alert("Admin login successful");
          sessionStorage.setItem("username", email);
          setFlagCheck(true);
          setToast(true);
          setEmail(""), setPassword("");
          const timeoutId = setTimeout(() => {
            navigate("/admin");
          }, 1000);
          // Clear the timeout
          return () => clearTimeout(timeoutId);
        } else if (data === "user") {
          sessionStorage.setItem("username", email);
          setFlagCheck(true);
          setToast(true);
          const timeoutId = setTimeout(() => {
            navigate("/user");
          }, 1000);
          // Clear the timeout
          return () => clearTimeout(timeoutId);
        } else {
          setEmail(""), setPassword("");
          setToast(true);
          flagCheck(false);
        }
      });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label> Email</label>{" "}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <br />
        <label> Password</label>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <br />
        <input type="submit" value="LOGIN" />
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
              {flagCheck ? "Login Success" : "Something Went Wrong"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Card.Body>
    </div>
  );
}

export default Login;
