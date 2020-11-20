import React from "react";

export default function Poster(props) {
  let movieImage =
    (props.movie.poster_path || props.movie.backdrop_path) === null
      ? "https://i.pinimg.com/originals/9e/4b/97/9e4b97433364d774a2a4a9c6290e8906.jpg"
      : "https://image.tmdb.org/t/p/original" +
        (props.movie.poster_path || props.movie.backdrop_path);

  const style = {
    margin: 20,
    backgroundImage:
      `url(${movieImage})` ||
      "url(https://i.pinimg.com/originals/9e/4b/97/9e4b97433364d774a2a4a9c6290e8906.jpg)"
  };

  return (
    <>
      <button
        onClick={() =>
          props.movieClicked(movieImage, props.movie.id, props.category)
        }
        style={style}
        className="ContentTile"
      ></button>
      <div className="ContentRow__spacer"></div>
    </>
  );
}
