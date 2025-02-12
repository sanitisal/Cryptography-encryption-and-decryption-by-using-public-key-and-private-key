import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SearchUser = ({ onUserSelect }) => {
  const [username, setUsername] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `http://ec2-35-154-172-61.ap-south-1.compute.amazonaws.com:8080/api/auth/search?username=${username}`
      );
      setSearchResults(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Error searching for user:", error);
      if (error.response && error.response.status === 404) {
        setError("User not found.");
      } else {
        setError("An error occurred while searching.");
      }
      setSearchResults([]);
    }
  };

  const handleUserSelect = (user) => {
    setUsername("");
    setSearchResults([]);
    onUserSelect(user);
  };

  return (
    <div className="container">
      
      <div className="card shadow-lg p-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search username..."
            value={username}
            onChange={handleInputChange}
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {searchResults.length > 0 && (
          <div className="mt-3 p-2 border rounded bg-light">
            <h6 className="text-primary">Search Results:</h6>
            <ul className="list-group">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => onUserSelect(user)}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>      
    </div>
  );
};

SearchUser.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
};

export default SearchUser;