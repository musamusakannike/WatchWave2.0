import MovieCard from "./MovieCard"
import { useContext } from "react"
import { ThemeContext } from "../ThemeContext.jsx"

const MoviesGrid = ({movieList}) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="w-100 p-1 d-flex justify-content-center">
        <div className="row justify-content-center w-100">
            {movieList?.length > 0 ? movieList.map((movie, index) => (
               <MovieCard key={index} movie={movie} /> 
            )): (
              <div className="col-12">
                <h4 className={`text-center my-5 text-${theme === "light"? "dark" : "light"}`}>No movies found</h4>
              </div>
            )} 
        </div>
    </div>
  )
}

export default MoviesGrid