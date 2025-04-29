import React from "react";
import AddMovie from "../components/movies/AddMovie";
import MovieList from "../components/movies/MovieList";
export default function Movies() {
  return (
    <div className="mt-5">
      {/* <AddMovie /> */}
      <MovieList />
    </div>
  );
}
