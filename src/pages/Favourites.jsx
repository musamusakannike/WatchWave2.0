import { ThemeContext } from "../ThemeContext.jsx";
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader.jsx";
import MoviesGrid from "../components/Movies/MoviesGrid.jsx";
import SeriesGrid from "../components/Series/SeriesGrid.jsx";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../config.js";

const Favourites = () => {
  const { theme } = useContext(ThemeContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteSeries, setFavouriteSeries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);

  const fetchFavouriteMovies = () => {
    const storedMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (storedMovies) {
      setFavouriteMovies(storedMovies);
    } else {
      setFavouriteMovies([]);
    }
    setLoadingMovies(false);
  };

  const fetchFavouriteSeries = () => {
    const storedSeries = JSON.parse(localStorage.getItem("favoriteSeries"));
    if (storedSeries) {
      setFavouriteSeries(storedSeries);
    } else {
      setFavouriteSeries([]);
    }
    setLoadingSeries(false);
  };

  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const moviesData = await Promise.all(
        favouriteMovies.map(async (movieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          return data;
        })
      );
      setMovies(moviesData);
    } catch (error) {
      console.error("Error fetching the movie: ", error);
      toast.error("An error occurred while fetching the movie data");
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchSeries = async () => {
    setLoadingSeries(true);
    try {
      const seriesData = await Promise.all(
        favouriteSeries.map(async (serieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          return data;
        })
      );
      setSeries(seriesData);
    } catch (error) {
      console.error("Error fetching the series: ", error);
      toast.error("An error occurred while fetching the series data");
    } finally {
      setLoadingSeries(false);
    }
  };

  useEffect(() => {
    fetchFavouriteMovies();
    fetchFavouriteSeries();
  }, []);

  useEffect(() => {
    if (favouriteMovies.length > 0) {
      fetchMovies();
    } else {
      setLoadingMovies(false);
    }
  }, [favouriteMovies]);

  useEffect(() => {
    if (favouriteSeries.length > 0) {
      fetchSeries();
    } else {
      setLoadingSeries(false);
    }
  }, [favouriteSeries]);

  return (
    <div className={`w-100 bg-${theme}`}>
      <h2
        className={`text-center display-4 fw-bold animate__animated animate__zoomIn pt-2 text-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        Favourites
      </h2>
      {loadingMovies || loadingSeries ? (
        <div
          className={`loader w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}
        >
          <Loader />
        </div>
      ) : (
        <>
          <h3 className={`text-${theme === "light" ? "dark" : "light"} mt-4`}>Favourite Movies</h3>
          <MoviesGrid movieList={movies} />
          <h3 className={`text-${theme === "light" ? "dark" : "light"} mt-4`}>Favourite Series</h3>
          <SeriesGrid seriesList={series} />
        </>
      )}
    </div>
  );
};

export default Favourites;
