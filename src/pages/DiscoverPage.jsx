import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "../components/Hero";
import MoviesGrid from "../components/MoviesGrid";
import SearchBar from "../components/SearchBar";
import { TMDB_API_KEY } from "../config.js";
import Loader from "../components/Loader.jsx";
import { ThemeContext } from "../ThemeContext.jsx";

const DiscoverPage = () => {
  const { theme } = useContext(ThemeContext);
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMoviesList(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the movies: ", error);
      setError("An error occurred while fetching the movie data");
      toast.error("An error occurred while fetching the movie data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={`w-100 bg-${theme}`}>
      <ToastContainer />
      {loading ? (
        <div className={`loader w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}>
          <Loader />
        </div>
      ) : (
        <>
          <Hero />
          <SearchBar />
          <h2 className={`text-start mt-2 ms-3 text-${theme === 'light' ? 'dark' : 'light'}`}>Discover New Movies</h2>
          <MoviesGrid movieList={moviesList} />
        </>
      )}
    </div>
  );
};

export default DiscoverPage;
