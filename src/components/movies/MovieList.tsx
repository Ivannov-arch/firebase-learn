import { useQuery } from "@tanstack/react-query";
import createGetMovieOptions from "../../functions/Get";
import UpdateMovie from "./UpdateMovie";

import React from "react";

export default function MovieList() {
  const { data, isPending } = useQuery(createGetMovieOptions());
  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((movie?) => (
          <div
            key={movie && movie?.id}
            className="col-span-1 my-3 p-3 border rounded"
          >
            <h1
              className={` ${movie?.hasAnOscar ? `text-green-500` : `text-red-500`}`}
            >
              {movie?.title}
            </h1>
            <p className="mb-2">Release Year: {movie?.releaseDate}</p>
            {movie?.id && <UpdateMovie movie={movie} />}
          </div>
        ))}
      </div>
    </div>
  );
}
