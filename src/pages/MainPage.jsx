import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.jsx";
import DiscoverPage from "./DiscoverPage";
import MoviePage from "./MoviePage";
import Navbar from "../components/Navbar";
import Categories from "./Categories";
import CategoryPage from "./CategoryPage";
import SearchResult from "./SearchResult";
import Favourites from "./Favourites";
import NotFound from "./NotFound";
import CustomerCare from "./CustomerCare";

const MainPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className={`d-md-flex bg-${theme}`} style={{maxWidth: "100vw", minHeight: "100vh", overflowX: "hidden"}}>
        <Navbar />
        <Routes>
            <Route path="/" element={<DiscoverPage />} />
            <Route path="movie/:movieId" element={<MoviePage />} />
            <Route path="search/:searchTitle" element={<SearchResult />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:categoryTitle" element={<CategoryPage />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="customercare" element={<CustomerCare />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default MainPage;