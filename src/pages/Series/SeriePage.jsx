import { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TMDB_API_KEY } from "../../config.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-step-progress-bar/styles.css";
import Serie from "../../components/Series/Serie.jsx";

const SeriePage = () => {
  const { theme } = useContext(ThemeContext);
  const { serieId } = useParams();
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSerie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${serieId}?api_key=${TMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSerie(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the serie: ", error);
      setError("An error occurred while fetching the serie data");
      toast.error("An error occurred while fetching the serie data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSerie();
  }, [serieId]);

  return (
    <div className="w-100">
      <Serie serie={serie} theme={theme} loading={loading} error={error} />
    </div>
  );
};

export default SeriePage;
