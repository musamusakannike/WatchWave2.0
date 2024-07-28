import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faHiking,
  faFilm,
  faLaugh,
  faUserSecret,
  faBook,
  faTheaterMasks,
  faHome,
  faDragon,
  faLandmark,
  faGhost,
  faMusic,
  faSearch,
  faHeart,
  faRobot,
  faTv,
  faRunning,
  faBomb,
  faHatCowboy,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext.jsx";
import Loader from "../components/Loader.jsx";

const icons = {
  faBolt,
  faHiking,
  faFilm,
  faLaugh,
  faUserSecret,
  faBook,
  faTheaterMasks,
  faHome,
  faDragon,
  faLandmark,
  faGhost,
  faMusic,
  faSearch,
  faHeart,
  faRobot,
  faTv,
  faRunning,
  faBomb,
  faHatCowboy,
};

const Categories = () => {
  const { theme } = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
    setIsLoading(false);
  }, []);

  return (
    <div className={`w-100 bg-${theme}`}>
      <h1
        className={`text-center display-4 fw-bold animate__animated animate__zoomIn pt-2 text-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        Categories
      </h1>
      <div className="row justify-content-center align-items-center p-3">
        {isLoading && (
          <div
            className={`loader w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}
          >
            <Loader />
          </div>
        )}
        {categories.map((category) => (
          <div key={category.id} className="col-sm-6 col-lg-4 col-xl-3">
            <Link
              to={`/categories/${category.id}`}
              className="text-decoration-none"
            >
              <div
                className={`card h-100 shadow m-3 py-4 px-3 bg-${theme} text-${
                  theme === "light" ? "dark" : "light"
                }`}
              >
                <div className="card-img text-center">
                  <FontAwesomeIcon
                    icon={icons[category.icon]}
                    size="3x"
                    className="text-danger"
                  />
                </div>
                <div className="card-body p-0 m-0 text-center">
                  <h3>{category.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
