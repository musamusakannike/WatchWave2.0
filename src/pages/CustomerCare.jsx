import { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext.jsx";

const CustomerCare = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:innovixwebservices@gmail.com?subject=Customer Care Inquiry&body=Name: ${encodeURIComponent(
      name
    )}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`w-100 vh-100 d-flex justify-content-center align-items-center bg-${theme}`}>
      <div className="card p-4 bg-transparent" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className={`card-title text-${theme === "light" ? "dark" : "light"} mb-4 text-center`}>
          Customer Care
        </h3>
        <form onSubmit={handleSendEmail}>
          <div className="mb-3">
            <label htmlFor="name" className={`form-label text-${theme === "light" ? "dark" : "light"}`}>
              Name
            </label>
            <input
              type="text"
              className={`bg-${theme} text-${theme === "light" ? "dark" : "light"} form-control`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className={`form-label text-${theme === "light" ? "dark" : "light"}`}>
              Email
            </label>
            <input
              type="email"
              className={`bg-${theme} text-${theme === "light" ? "dark" : "light"} form-control`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className={`form-label text-${theme === "light" ? "dark" : "light"}`}>
              Message
            </label>
            <textarea
              className={`bg-${theme} text-${theme === "light" ? "dark" : "light"} form-control`}
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerCare;
