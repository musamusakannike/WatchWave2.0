const Backdrop = ({ image, title }) => {
  return (
    <div
      className="d-none d-md-flex w-100 vh-50 m-0 p-0 bg-light justify-content-center align-items-center"
      id="backdrop-container"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="display-4 text-center text-light animate__animated animate__zoomIn">
        {title}
      </h1>
    </div>
  );
};

export default Backdrop;
