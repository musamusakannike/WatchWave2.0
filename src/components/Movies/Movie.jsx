import Genres from "../Genres";
import Loader from "../Loader";
import { ProgressBar } from "react-step-progress-bar";
import { ToastContainer } from "react-toastify";
import Backdrop from "../Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFilm } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-parallax-tilt";

const Movie = ({ movie, theme, loading }) => {
  function convertToSlug(str) {
    return str
      .toLowerCase() // Convert the string to lowercase
      .trim() // Remove whitespace from both ends of the string
      .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
      .replace(/[^\w-]+/g, ""); // Remove all non-word characters except for hyphens
  }

  return (
    <div className="w-100">
      <div className={`w-100 bg-${theme}`}>
        <ToastContainer />
        {loading ? (
          <div
            className={`loader w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}
          >
            <Loader />
          </div>
        ) : (
          <>
            <Backdrop
              image={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : "/assets/images/backdrop.jpg"
              }
              title={movie.title}
            />
            <div
              className={`card shadow p-1 border-0 justify-content-center bg-${theme}`}
            >
              <div className="row mx-auto p-2">
                <div className="col-md-4 text-center">
                  <div className="overflow-hidden">
                    <Tilt
                      className="tilt-card"
                      tiltMaxAngleX={25}
                      tiltMaxAngleY={25}
                      scale={1.1}
                      transitionSpeed={2500}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/assets/images/dummy.png"
                        }
                        alt={movie.title}
                        className="rounded-0 mx-auto"
                        loading="lazy"
                      />
                    </Tilt>
                  </div>
                </div>
                <div
                  className={`col-md-8 p-0 p-md-2 text-${
                    theme === "light" ? "dark" : "light"
                  }`}
                >
                  <h1>{movie.title}</h1>
                  <i>
                    <small
                      className={`text-${
                        theme === "light" ? "muted" : "light"
                      }`}
                    >
                      {movie.tagline && movie.tagline}
                    </small>
                  </i>
                  <div className="border-1 p-1">
                    <Genres genres={movie.genres} />
                  </div>
                  <p>{movie.overview}</p>
                  <div className="row">
                    <div className="col-6">
                      {movie.runtime && (
                        <p>Duration: {movie.runtime} minutes</p>
                      )}
                      <p>
                        Release Date:{" "}
                        {new Date(movie.release_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-6">
                      {movie.budget && (
                        <p>Budget: ${movie.budget.toLocaleString()}</p>
                      )}
                      {movie.revenue && (
                        <p>Revenue: ${movie.revenue.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="d-inline-block">
                      Rating: {movie.vote_average}/10
                    </p>
                    <ProgressBar
                      percent={movie.vote_average * 10}
                      filledBackground="linear-gradient(to right, #fefb72, #dc3545)"
                    />
                  </div>
                  <div className="p-3">
                    {movie.video && (
                      <iframe
                        title="Trailer"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movie.video}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                  <div className="my-4">
                    <div className="row">
                      <div className="col">
                        <a
                          href={`https://netnaija.xyz/${convertToSlug(
                            movie.title
                          )}`}
                          className="btn btn-success w-100 m-1"
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faDownload} /> NETNAIJA
                        </a>
                      </div>
                      <div className="col">
                        <a
                          href={`https://nkiri.com/${convertToSlug(
                            movie.title
                          )}`}
                          className="btn btn-light w-100 m-1"
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faDownload} /> NKIRI
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      {movie.homepage && (
                        <div className="col">
                          <a
                            href={movie.homepage}
                            className="btn btn-danger w-100 m-1"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faFilm} /> MOVIE SITE
                          </a>
                        </div>
                      )}
                      {movie.imdb_id && (
                        <div className="col">
                          <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            className="btn btn-warning w-100 m-1"
                            target="_blank"
                          >
                            IMDB
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Movie;
