import React, { useState, useEffect } from "react";
import { getMovies, searchMovie } from "../utils/api";
import InfiniteScroll from "react-bidirectional-infinite-scroll";
import Poster from "./poster";
import MovieTab from "./movieTab";

export default function Explore(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (props.category === "search") {
      setMovies([]);
      setNumOfPages(1);
      setPageNumber(1);
    }
    if (props.category !== "search" && props.category !== "") {
      getMovies(pageNumber, props.category)
        .then((res) => {
          setNumOfPages(res.data.total_pages);
          setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
        })
        .catch((e) => {
          console.error();
        });
    }
    if (props.category === "search" && props.searchQuery !== "") {
      setSearchQuery(props.searchQuery);
      searchMovie(props.searchQuery, pageNumber).then((res) => {
        setNumOfPages(res.total_pages);
        console.log("function called");
        setMovies((prevMovies) => [...prevMovies, ...res.results]);
      });
      return;
    }
  }, [pageNumber, props.searchQuery, props.category, searchQuery]);

  const handlePageUpdate = () => {
    if (pageNumber < 10 && pageNumber < numOfPages) {
      setPageNumber((num) => num + 1);
    }
    return;
  };

  const title =
    props.category === "search"
      ? `Results for " ${props.searchQuery} "`
      : props.category + " Movies";

  return (
    <>
      <div className="ContentRow">
        <div className="ContentRow__title">{title}</div>
        <div value="Trending" className="ContentRow__items">
          <InfiniteScroll onReachRight={handlePageUpdate} horizontal>
            <div className="ContentRow__spacer"></div>
            {movies.map((movie, i) => (
              <Poster
                category={props.category}
                movieClicked={props.movieClicked}
                movie={movie}
                key={i}
                movieId={props.movieClickedId}
                selectedMovie={props.movieId}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <MovieTab movieId={props.movieId} show={props.show} />
    </>
  );
}
