import React, { useState, useEffect } from "react";
import Explore from "./components/explore";
import logo from "./img/dblogo.svg";
import SearchBar from "./components/search";

export default function App() {
  const [movieId, setMovieId] = useState("");
  const [background, setBackground] = useState(
    "https://2.bp.blogspot.com/-_a-2wwIKifM/WY2KITBSBQI/AAAAAAAAAQU/72EggZgYN5go7j-cKnPVs0Cpxu0U9YknQCLcBGAs/s1600/WonderWomanposter.jpg"
  );
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  let style = {
    backgroundImage: `url(${background})`
  };

  function handleBackground(image, id, category) {
    setBackground(image);
    setMovieId(id);
    setCategory(category);
  }

  function handleSearch(query) {
    setCategory("search");
    setSearchQuery(query);
    setMovieId("");
  }

  function homeButton() {
    setBackground(
      "https://2.bp.blogspot.com/-_a-2wwIKifM/WY2KITBSBQI/AAAAAAAAAQU/72EggZgYN5go7j-cKnPVs0Cpxu0U9YknQCLcBGAs/s1600/WonderWomanposter.jpg"
    );
    setMovieId("");
    setCategory("");
    setSearchQuery("");
  }

  return (
    <>
      <div className="Home">
        <div style={style} className="Hero"></div>
        <div className="Explore">
          <a href="https://developers.themoviedb.org/3/getting-started/introduction">
            <img className="dblogo" alt="movie database logo" src={logo} />
          </a>
          <SearchBar handleSearch={handleSearch} />
          {category === "search" ? (
            <>
              <div onClick={homeButton} id="btn">
                <span class="noselect">Go Back</span>
                <div id="circle"></div>
              </div>
              <Explore
                category="search"
                movieId={category === "search" ? movieId : ""}
                show={category === "search"}
                movieClicked={handleBackground}
                searchQuery={searchQuery}
              />
            </>
          ) : (
            <>
              <Explore
                category="Trending"
                movieId={category === "Trending" ? movieId : ""}
                show={category === "Trending"}
                movieClicked={handleBackground}
              />
              <Explore
                category="Popular"
                movieId={category === "Popular" ? movieId : ""}
                show={category === "Popular"}
                movieClicked={handleBackground}
              />
              <Explore
                category="Upcoming"
                movieId={category === "Upcoming" ? movieId : ""}
                show={category === "Upcoming"}
                movieClicked={handleBackground}
              />
              <Explore
                category="Top Rated"
                movieId={category === "Top Rated" ? movieId : ""}
                show={category === "Top Rated"}
                movieClicked={handleBackground}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
