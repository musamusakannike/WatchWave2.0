import { useEffect, useState, useContext } from "react";
import { TMDB_API_KEY } from "../../config";
import { ThemeContext } from "../../ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader";
import SeriesGrid from "../../components/Series/SeriesGrid";
import Hero from "../../components/Hero";
import SeriesSearchBar from "../../components/Series/SeriesSearchBar";

const SeriesDiscovery = () => {
  const { theme } = useContext(ThemeContext);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShows = async () => {
    const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShows(data.results);
      // console.log(data.results)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the TV series: ", error);
      toast.error("An error occurred while fetching the TV series data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
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
          <SeriesSearchBar />
          <h2 className={`text-start mt-2 ms-3 text-${theme === 'light' ? 'dark' : 'light'}`}>Discover New TV Series</h2>
          <SeriesGrid seriesList={shows} />
        </>
      )}
    </div>
  );
};

export default SeriesDiscovery;
