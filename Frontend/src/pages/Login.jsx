import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hero from "../assets/img/hero-img.png";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("chat-username");
    if (storedUsername) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setError("");

      if (username && password) {
        const response = await axios.post(
          "http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/auth/login",
          {
            username,
            password,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("chat-username", username);
          navigate("/dashboard");
        }
      } else {
        setError("Please enter both username and password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password.");
      } else if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop:'4rem'}}>
      
        
      <div className="card mx-auto border-primary border-3">
      <div className="row g-2">
        <div className="col-4">
          <img src={hero} className="img-fluid rounded-start " alt="NA"/>
        </div>
        <div className="col-5">        
        <h3 className="card-title mt-2 text-center">File Share App - Login</h3>
        
      <div className="card-body">
      {error && <div className="text-danger mb-2 fw-bold">{error}</div>}
      
      <input type="text" placeholder="Username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === 13) handleLogin();
              }} />
      <input required type="password" placeholder="Password" className="form-control mt-2" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === 13) handleLogin();
              }} />
      <button className="btn btn-primary mt-3 float-end" onClick={handleLogin}>Login</button>
      <br/>
      <br/>
      <div className="mt-4 float-start">
      Don&apos;t have an account? 
      <button type="button" className="btn btn-success ms-2"
              onClick={() => navigate("/signup")}>
              Sign up
      </button>
      <br/>
      <Link to="/home" replace={true} className="btn btn-link">Back to Home</Link>
      </div>
      </div>
      </div>
      </div>  
      </div>

    </div>
  );
}

export default Login;