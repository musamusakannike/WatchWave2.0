import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../../config.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import Movie from "../../components//Movies/Movie.jsx";

const MoviePage = () => {
  const { theme } = useContext(ThemeContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovie(data);
      // console.log(data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the movie: ", error);
      setError("An error occurred while fetching the movie data");
      toast.error("An error occurred while fetching the movie data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [movieId]);

  return (
    <div className="w-100">
      <Movie movie={movie} theme={theme} loading={loading} error={error} />
    </div>
  );
};

export default MoviePage;
