import { useState, useRef, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../../config.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import MoviesGrid from "../../components/Movies/MoviesGrid.jsx";
import SearchBar from "../../components/Movies/MovieSearchBar.jsx";

const SearchResult = () => {
  const { theme } = useContext(ThemeContext);
  const { searchTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moviesList, setMoviesList] = useState([]); //
  const movieNameRef = useRef(searchTitle);

  // Fetch movie details using searchTitle and TMDB_API_KEY
  const fetchMovie = async () => {
    try {
      let movieName = movieNameRef.current;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          movieName
        )}`
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
    movieNameRef.current = searchTitle;
    fetchMovie();
  }, [searchTitle]);

  return (
    <div className={`w-100 pt-4 bg-${theme}`}>
      <SearchBar />
      {moviesList && (
        <div>
          <h4 className={`text-${theme === "light" ? "dark" : "light"}`}>
            Search Results
          </h4>
          <MoviesGrid movieList={moviesList} />
        </div>
      )}
      {moviesList.length < 3 && (
        <div className="text-center">
          <h5>Perhaps you're searching for a <Link to={`/series-search/${searchTitle}`}>TV Series</Link></h5>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
