import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { TMDB_API_KEY } from "../config";
import { ThemeContext } from "../ThemeContext.jsx";
import MoviesGrid from "../components/MoviesGrid.jsx";
import "react-toastify/dist/ReactToastify.css";

const CategoryPage = () => {
  const { theme } = useContext(ThemeContext);
  const { categoryTitle } = useParams();
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    const categoryMapping = {
      action: 28,
      adventure: 12,
      animation: 16,
      comedy: 35,
      crime: 80,
      documentary: 99,
      drama: 18,
      family: 10751,
      fantasy: 14,
      history: 36,
      horror: 27,
      music: 10402,
      mystery: 9648,
      romance: 10749,
      scienceFiction: 878,
      tvMovie: 10770,
      thriller: 53,
      war: 10752,
      western: 37,
    };
    const genreId = categoryMapping[categoryTitle];
    if (!genreId) {
      setError("Invalid category");
      return;
    }
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        setMoviesList(data.results);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching the movies: ', error);
        setError('An error occurred while fetching the movie data');
      }
  };

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <div className={`w-100 bg-${theme}`}>
      <h1
        className={`text-center display-4 fw-bold animate__animated animate__zoomIn pt-2 text-capitalize text-${
          theme === "light" ? "dark" : "light"
        }`}
      >
        {categoryTitle}
      </h1>
      <div>
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
              <h2
                className={`text-start mt-2 ms-3 text-${
                  theme === "light" ? "dark" : "light"
                }`}
              >
              </h2>
              <MoviesGrid movieList={moviesList} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
