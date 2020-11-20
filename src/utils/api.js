import { useEffect, useState } from "react";
import axios from "axios";

export function getMovies(pageNumber, category) {
  category = category.toLowerCase();
  if (category === "trending") {
    return axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/${category}/movie/week?api_key=${process.env.REACT_APP_MM_KEY}`,
      params: { page: pageNumber }
    });
  }
  if (category === "top rated") {
    return axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US`,
      params: { page: pageNumber }
    });
  }
  return axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US`,
    params: { page: pageNumber }
  });
}

export async function getMovieData(movie_id) {
  return axios
    .get(
      `
  https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function getTrailer(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_MM_KEY}&language=en-US`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function searchMovie(encodedQuery, num) {
  const page = num ? "&page=" + num : "";

  return axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_MM_KEY
      }&language=en-US&query=${encodeURI(
        encodedQuery
      )}&${page}&include_adult=false`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
