import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../../config.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import SeriesGrid from "../../components/Series/SeriesGrid.jsx";
import SeriesSearchBar from "../../components/Series/SeriesSearchBar.jsx";

const SeriesSearchResult = () => {
  const { theme } = useContext(ThemeContext);
  const { searchTitle } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seriesList, setSeriesList] = useState([]); //
  const serieNameRef = useRef(searchTitle);

  // Fetch serie details using searchTitle and TMDB_API_KEY
  const fetchSerie = async () => {
    try {
      let serieName = serieNameRef.current;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(serieName)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSeriesList(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the series: ", error);
      setError("An error occurred while fetching the serie data");
      toast.error("An error occurred while fetching the serie data");
      setLoading(false);
    }
  };

  useEffect(() => {
    serieNameRef.current = searchTitle;
    fetchSerie();
  }, [searchTitle]);

  return (
    <div className={`w-100 pt-4 bg-${theme}`}>
      <SeriesSearchBar />
      {seriesList && (
        <div>
          <h4 className={`text-${theme === "light" ? "dark" : "light"}`}>
            Search Results
          </h4>
          <SeriesGrid seriesList={seriesList} />
        </div>
      )}
    </div>
  );
};

export default SeriesSearchResult;
