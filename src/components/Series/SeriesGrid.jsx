import SeriesCard from "./SeriesCard"
import { useContext } from "react"
import { ThemeContext } from "../../ThemeContext.jsx"

const SeriesGrid = ({seriesList}) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="w-100 p-1 d-flex justify-content-center">
        <div className="row justify-content-center w-100">
            {seriesList?.length > 0 ? seriesList.map((serie, index) => (
               <SeriesCard key={index} serie={serie} /> 
            )): (
              <div className="col-12">
                <h4 className={`text-center my-5 text-${theme === "light"? "dark" : "light"}`}>No movies found</h4>
              </div>
            )} 
        </div>
    </div>
  )
}

export default SeriesGrid