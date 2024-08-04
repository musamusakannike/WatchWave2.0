import Genres from "../Genres";
import Loader from "../Loader";
import { ProgressBar } from "react-step-progress-bar";
import { ToastContainer } from "react-toastify";
import Backdrop from "../Backdrop";
import Tilt from "react-parallax-tilt";

const Serie = ({ serie, theme, loading }) => {
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
                serie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${serie.backdrop_path}`
                  : "/assets/images/backdrop.jpg"
              }
              title={serie.name}
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
                          serie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                            : "/assets/images/dummy.png"
                        }
                        alt={serie.name}
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
                  <h1>{serie.name}</h1>
                  <i>
                    <small
                      className={`text-${
                        theme === "light" ? "muted" : "light"
                      }`}
                    >
                      {serie.tagline && serie.tagline}
                    </small>
                  </i>
                  <div className="border-1 p-1">
                    <Genres genres={serie.genres} />
                  </div>
                  <p>{serie.overview}</p>
                  <div className="row">
                    <div className="col-6">
                      <p>
                        First Air Date:{" "}
                        {new Date(serie.first_air_date).toLocaleDateString()}
                      </p>
                      <p>
                        Last Air Date:{" "}
                        {new Date(serie.last_air_date).toLocaleDateString()}
                      </p>
                      <p>Status: {serie.status}</p>
                    </div>
                    <div className="col-6">
                      <p>Number of Seasons: {serie.number_of_seasons}</p>
                      <p>Number of Episodes: {serie.number_of_episodes}</p>
                    </div>
                  </div>
                  {serie.next_episode_to_air && (
                    <div className="d-flex justify-content-center">
                      <p className="d-inline-block">
                        Next Episode:
                        <br />
                        Title: {serie.next_episode_to_air.name}
                        <br />
                        Season {serie.next_episode_to_air.season_number},
                        Episode {serie.next_episode_to_air.episode_number}
                        <br />
                        Air Date:{" "}
                        {new Date(
                          serie.next_episode_to_air.air_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="d-inline-block">
                      Rating: {serie.vote_average}/10
                    </p>
                    <ProgressBar
                      percent={serie.vote_average * 10}
                      filledBackground="linear-gradient(to right, #fefb72, #dc3545)"
                    />
                  </div>
                  <div className="p-3">
                    {serie.video && (
                      <iframe
                        title="Trailer"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${serie.video}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                  <div className="my-4">
                    <div className="row">
                      {serie.name && (
                        <div className="col">
                          <a
                            href={`https://series.netnaija.xyz/${convertToSlug(
                              serie.name
                            )}`}
                            className="btn btn-danger w-100 m-1"
                            target="_blank"
                          >
                            DOWNLOAD
                          </a>
                        </div>
                      )}
                      {serie.homepage && (
                        <div className="col">
                          <a
                            href={serie.homepage}
                            className="btn btn-info w-100 m-1"
                            target="_blank"
                          >
                            TV SHOW SITE
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

export default Serie;
