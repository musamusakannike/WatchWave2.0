import { useContext, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Utility functions for managing favourite series in local storage
const addFavoriteSerie = (serieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
  if (!favourites.includes(serieId)) {
    favourites.push(serieId);
    localStorage.setItem("favoriteSeries", JSON.stringify(favourites));
  }
};

const removeFavoriteSerie = (serieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
  const newfavourites = favourites.filter((id) => id !== serieId);
  localStorage.setItem("favoriteSeries", JSON.stringify(newfavourites));
};

const isFavoriteSerie = (serieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
  return favourites.includes(serieId);
};

const SeriesCard = ({ serie }) => {
  const { theme } = useContext(ThemeContext);
  const [isFav, setIsFav] = useState(isFavoriteSerie(serie.id));

  useEffect(() => {
    setIsFav(isFavoriteSerie(serie.id));
  }, [serie.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent the Link from navigating
    if (isFav) {
      removeFavoriteSerie(serie.id);
    } else {
      addFavoriteSerie(serie.id);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xxl-2 mx-auto my-2">
      <div
        className={`card p-0 w-100 h-100 rounded-0 border-0 animate__animated animate__zoomIn mx-auto bg-${theme}`}
      >
        <div className="card-img overflow-hidden">
          <Link to={`/serie/${serie.id}`} className="position-relative">
            <div>
              <div
                className={`bg-light rounded py-1 px-2 m-1 position-absolute ${
                  isFav ? "text-danger" : "text-muted"
                } rounded border-${isFav ? "danger" : "muted"} border-2 rounded-circle`}
                style={{ zIndex: "99" }}
                onClick={handleFavoriteClick}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <p className="text-warning shadow position-absolute mb-0 me-1" style={{ zIndex: "99", bottom: "0", right: "0"}}>
                {Math.round(serie.vote_average * 10) / 10}
              </p>
              <Tilt
                className="tilt-card"
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.1}
                transitionSpeed={2500}
              >
                <img
                  src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : "/assets/images/dummy.png"}
                  alt={serie.title}
                  className="rounded-0"
                  loading="lazy"
                />
              </Tilt>
            </div>
          </Link>
        </div>
        <div className="card-body">
          <Link to={`/serie/${serie.id}`} className="text-decoration-none">
            <h4
              className={`card-title lead text-center text-${
                theme === "light" ? "dark" : "light"
              }`}
            >
              {serie.title}
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
