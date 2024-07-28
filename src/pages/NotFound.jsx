import { useContext } from "react"
import { ThemeContext } from "../ThemeContext.jsx";
import { Link } from "react-router-dom";

const NotFound = () => {
    const { theme } = useContext(ThemeContext);

  return (
    <div className={`w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme} text-center`}>
        <div>
            <h1 className={`display-2 text-${theme==='light'? 'dark': 'light'}`}>404</h1>
            <h4 className={`text-${theme==='light'? 'dark': 'light'}`}>Page Not Found</h4>
            <Link to="/" className="btn btn-lg btn-danger">Go Home</Link>
        </div>
    </div>
  )
}

export default NotFound