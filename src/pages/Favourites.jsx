import { ThemeContext } from "../ThemeContext.jsx";
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader.jsx";
import MoviesGrid from "../components/MoviesGrid.jsx";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../config.js";

const Favourites = () => {
  const { theme } = useContext(ThemeContext);
  const [favourites, setFavourites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = () => {
    const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
    console.log("Fetched favourites from localStorage:", storedFavourites);
    if (storedFavourites) {
      setFavourites(storedFavourites);
    } else {
      setFavourites([]);
    }
    setLoading(false);
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const moviesData = await Promise.all(
        favourites.map(async (favourite) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${favourite}?api_key=${TMDB_API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Fetched movie data:", data);
          return data;
        })
      );
      setMovies(moviesData);
      console.log("Movies set in state:", moviesData);
    } catch (error) {
      console.error("Error fetching the movie: ", error);
      toast.error("An error occurred while fetching the movie data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  useEffect(() => {
    if (favourites.length > 0) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [favourites]);

  return (
    <div className={`w-100 bg-${theme}`}>
      <h2 className={`text-center display-4 fw-bold animate__animated animate__zoomIn pt-2 text-${theme === 'light' ? 'dark' : 'light'}`}>Favourites</h2>
      {loading ? (
        <div className={`loader w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}>
          <Loader />
        </div>
      ) : (
        <>
          <MoviesGrid movieList={movies} />
        </>
      )}
    </div>
  );
};

export default Favourites;
