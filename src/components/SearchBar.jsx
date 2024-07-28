import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mx-2 mx-md-5">
      <div className="input-group">
        <input
          type="text"
          className={`form-control border-danger bg-${theme} text-${theme === "light" ? "dark" : "light"}`}
          placeholder="Search by Movie Name"
          aria-label="Search by Movie Name"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search-input"
        />
        <div className="input-group-append">
          <button
            className="input-group-text btn btn-danger"
            id="basic-addon2"
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <FontAwesomeIcon icon={faSearch} size="2x" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
