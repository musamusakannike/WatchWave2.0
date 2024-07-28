import React from "react";

const Genres = ({ genres }) => {
  const categoryMapping = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scienceFiction: 878,
    tvMovie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
  };

  // Invert the categoryMapping to create a mapping from ID to name
  const idToNameMapping = Object.entries(categoryMapping).reduce(
    (acc, [name, id]) => {
      acc[id] = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter of each name
      return acc;
    },
    {}
  );

  return (
    <div className="d-flex gap-1 overflow-scroll">
      {genres?.map((genre, index) => (
        <div key={index} className="mb-3" style={{ flex: "0 0 auto" }}>
          <div className="card bg-info text-white p-1">
            <div className="card-body p-0">
              <p className="card-title text-light text-center m-0">
                {genre.name || "Unknown Genre"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Genres;
