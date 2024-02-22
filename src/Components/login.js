import React, { useState } from "react";
import "./login.css"; // Import your CSS file for styling

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("agentinfinity789@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [classID, setClassID] = useState("CYSJKPIU");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/user/qrDisplayLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, classID }),
        }
      );
      const data = await response.json();
      console.log(data.token);
      if (response.ok) {
        onLogin(classID, data.token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="box"
      style={{ backgroundImage: `url('https://rb.gy/6z01kb')` }}
    >
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Class ID:</label>
            <input
              className="form-control"
              type="text"
              value={classID}
              onChange={(e) => setClassID(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="btn-container">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
