import { useContext, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Utility functions for managing favourite movies in local storage
const addFavoriteMovie = (movieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  if (!favourites.includes(movieId)) {
    favourites.push(movieId);
    localStorage.setItem("favoriteMovies", JSON.stringify(favourites));
  }
};

const removeFavoriteMovie = (movieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const newfavourites = favourites.filter((id) => id !== movieId);
  localStorage.setItem("favoriteMovies", JSON.stringify(newfavourites));
};

const isFavoriteMovie = (movieId) => {
  const favourites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  return favourites.includes(movieId);
};

const MovieCard = ({ movie }) => {
  const { theme } = useContext(ThemeContext);
  const [isFav, setIsFav] = useState(isFavoriteMovie(movie.id));

  useEffect(() => {
    setIsFav(isFavoriteMovie(movie.id));
  }, [movie.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent the Link from navigating
    if (isFav) {
      removeFavoriteMovie(movie.id);
    } else {
      addFavoriteMovie(movie.id);
    }
    setIsFav(!isFav);
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xxl-2 mx-auto my-2">
      <div
        className={`card p-0 w-100 h-100 rounded-0 border-0 animate__animated animate__zoomIn mx-auto bg-${theme}`}
      >
        <div className="card-img overflow-hidden">
          <Link to={`/movie/${movie.id}`} className="position-relative">
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
                {Math.round(movie.vote_average * 10) / 10}
              </p>
              <Tilt
                className="tilt-card"
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.1}
                transitionSpeed={2500}
              >
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/assets/images/dummy.png"}
                  alt={movie.title}
                  className="rounded-0"
                  loading="lazy"
                />
              </Tilt>
            </div>
          </Link>
        </div>
        <div className="card-body">
          <Link to={`/movie/${movie.id}`} className="text-decoration-none">
            <h4
              className={`card-title lead text-center text-${
                theme === "light" ? "dark" : "light"
              }`}
            >
              {movie.title}
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
