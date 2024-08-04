import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.jsx";
import DiscoverPage from "./Movies/DiscoverPage";
import MoviePage from "./Movies/MoviePage";
import Navbar from "../components/Navbar";
import Categories from "./Movies/Categories";
import CategoryPage from "./Movies/CategoryPage";
import SearchResult from "./Movies/SearchResult";
import Favourites from "./Favourites";
import NotFound from "./NotFound";
import CustomerCare from "./CustomerCare";
import SeriesDiscovery from "./Series/SeriesDiscoverPage"
import SeriePage from "./Series/SeriePage.jsx";
import SeriesSearchResult from "./Series/SeriesSearchResult.jsx";

const MainPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`bg-${theme}`} id="main-page" style={{maxWidth: "100vw", minHeight: "100vh", overflowX: "hidden", display: "flex"}}>
        <Navbar />
        <div className="w-100">
          <Routes>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="movie/:movieId" element={<MoviePage />} />
              <Route path="search/:searchTitle" element={<SearchResult />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:categoryTitle" element={<CategoryPage />} />
              <Route path="series" element={<SeriesDiscovery />} />
              <Route path="serie/:serieId" element={<SeriePage />} />
              <Route path="series-search/:searchTitle" element={<SeriesSearchResult />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="customercare" element={<CustomerCare />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default MainPage;
