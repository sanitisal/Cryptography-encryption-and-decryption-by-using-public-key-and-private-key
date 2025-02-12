import { useState } from "react";
import axios from "axios";
import hero from "../assets/img/hero-img.png";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return "Password must contain at least one uppercase letter, one number, and one special character.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailValidationMessage = validateEmail(email);
    const passwordValidationMessage = validatePassword(password);

    setEmailError(emailValidationMessage);
    setPasswordError(passwordValidationMessage);

    if (emailValidationMessage || passwordValidationMessage) {
      return; // Stop form submission if there are errors
    }

    try {
      const payload = {
        username,
        name,
        email,
        password,
      };
      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/auth/register",
        payload
      );

      console.log("Signup successful:", response.data);
      alert("Signup Successful...");
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setError(null);
      setEmailError("");
      setPasswordError("");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setError(
          error.response.data.message || "Error signing up. Please try again."
        );
      } else {
        setError("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "4rem" }}>
      <div className="card mx-auto border-primary border-3">
        <div className="row g-0">
          <div className="col-4">
            <img src={hero} className="img-fluid rounded-start" alt="NA" />
          </div>
          <div className="col-5">
            <h3 className="card-title mt-2 text-center">File Share App - Signup</h3>

            <div className="card-body">
              <form onSubmit={handleSignup}>
                {error && <p className="text-danger mb-4">{error}</p>}
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value)); 
                  }}
                  required
                />
                {emailError && <p className="text-danger">{emailError}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mt-2"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value)); 
                  }}
                />
                {passwordError && <p className="text-danger">{passwordError}</p>}

                <button type="submit" className="btn btn-success mt-3">
                  Signup
                </button>
                <Link to="/login" className="btn btn-info ms-3 mt-3">
                  Back to Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
