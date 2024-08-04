import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import { TMDB_API_KEY } from "../../config.js";
import Loader from "../Loader.jsx";
import { toast } from "react-toastify";

const MovieActors = ({ movieId }) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActors(data.cast);
      } catch (error) {
        console.error("Error fetching actors: ", error);
        toast.error("An error occurred while fetching the actors data");
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [movieId]);

  return (
    <div className="my-4 w-100">
      <div>
        <h3 className="text-center mb-4">Actors</h3>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div
              className="d-lg-none d-flex overflow-auto"
              style={{ paddingRight: "300px" }}
            >
              {actors.map((actor, index) => (
                <div
                  className={`card m-2 h-100 bg-${theme} text-${
                        theme === "light" ? "dark" : "light"
                      }`}
                  style={{ minWidth: "150px" }}
                  key={index}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "/assets/images/dummy.png"
                    }
                    className="card-img-top"
                    alt={actor.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{actor.name}</h5>
                    <p className="card-text">as {actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-none d-lg-block">
              <div className="row">
                {actors.map((actor, index) => (
                  <div className="col-lg-2 my-2" key={index}>
                    <div
                      className={`card m-2 h-100 bg-${theme} text-${
                        theme === "light" ? "dark" : "light"
                      }`}
                      style={{ minWidth: "100px" }}
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                            : "/assets/images/dummy.png"
                        }
                        className="card-img-top"
                        alt={actor.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{actor.name}</h5>
                        <p className="card-text">as {actor.character}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieActors;
