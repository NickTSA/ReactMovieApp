import React, { useRef, useState, useEffect } from "react";
import { getMovieData, getTrailer } from "../utils/api";
import youtube from "../../img/youtube.svg";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
let numeral = require("numeral");

export default function MovieTab(props) {
  const [movie, setMovie] = useState("");
  const [video, setVideo] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const { movieId } = props;
  const info = useRef();

  useEffect(() => {
    if (movieId === "") {
      setMovie("");
      setVideo(false);
      setTrailer(null);
      return;
    }
    getMovieData(movieId).then((res) => {
      setMovie(res);
      if (props.show) {
        scroll(info);
      }
    });
    getTrailer(movieId).then((res) => {
      if (res.results[0] === undefined) {
        setTrailer(null);
      } else {
        setTrailer(res.results[0].key);
      }
    });
  }, [movieId, props.show]);

  function scroll(ref) {
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 260);
  }

  const movieTrailer = trailer ? (
    <>
      <span onClick={() => setVideo(true)} className="trailer">
        Play Trailer
        <img style={{ width: "27px" }} src={youtube} alt="Trailer" />
      </span>{" "}
      <ModalVideo
        autoplay="true"
        isOpen={video}
        videoId={trailer}
        onClose={() => setVideo(false)}
      />{" "}
    </>
  ) : null;

  let revenue = movie.revenue ? (
    <span className="releaseDate">
      {numeral(movie.revenue).format("($0,0)")}
    </span>
  ) : (
    <span className="releaseDate">TBD</span>
  );

  let genre =
    movie.genres === undefined
      ? ""
      : movie.genres.map((genre, i) => {
          if (movie.genres.length - 1 === i || i === 2)
            return <span key={i}>{genre.name}</span>;
          if (i < 1) return <span key={i}>{genre.name}, </span>;
        });
  let company =
    movie.production_companies === undefined
      ? ""
      : movie.production_companies.map((company, i) => {
          if (movie.production_companies.length - 1 === i || i === 3)
            return <span key={i}>{company.name}</span>;
          if (i < 2) return <span key={i}>{company.name}, </span>;
        });

  let movieImage =
    (movie.poster_path || movie.backdrop_path) === null
      ? "https://i.pinimg.com/originals/9e/4b/97/9e4b97433364d774a2a4a9c6290e8906.jpg"
      : "https://image.tmdb.org/t/p/original" +
        (movie.poster_path || movie.backdrop_path);

  return (
    <div ref={info} className="container">
      <input type="checkbox" id="toggle" readOnly checked={movieId} />
      <div className="fieldsetContainer">
        <div className="movieContainer">
          <img className="moviePoster" src={movieImage} alt="" />
        </div>
        <div className="textArea" id="fdstLorem">
          <div className="movieTitle">{movie.title}</div>
          <div className="tagLine">{movie.tagline}</div>
          {movie.overview}
          <div>
            <span className="movieGenre">{genre}</span>
            {movieTrailer}
          </div>
          <div className="company">{company}</div>
          <div>
            <span className="release">Original Release:</span>
            <span className="runtime">Running Time:</span>
          </div>
          <div>
            <span className="releaseDate">{movie.release_date}</span>
            <span className="minutes"> {movie.runtime} mins</span>
          </div>
          <div>
            <span className="release">Box Office:</span>
            <span className="runtime">Vote Average: </span>
          </div>
          <div>
            {revenue}
            <span className="minutes">{movie.vote_average} / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
