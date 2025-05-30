import React, { useState } from "react";
import { useDeleteMovie, useUpdateMovie } from "../../functions/Updates";
import { Movie } from "../../types/movie";
type UpdateMovieProps = Pick<Movie, "id" | "title">;

export default function UpdateMovie({ movie }: { movie: UpdateMovieProps }) {
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  // const [MovieList, setMovieList] = useState<Movie[]>([]);

  const deletion = useDeleteMovie({ id: movie.id || "" });
  const update = useUpdateMovie({
    id: movie.id || "",
    updatedTitle: updatedTitle,
  });

  return (
    <>
      <div className="flex flex-col justify-between gap-2">
        <div className="flex gap-2">
          <input
            className="px-2 py-1 border rounded w-full min-w-0 placeholder-stone-500"
            placeholder="new title..."
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 px-3 py-1 text-white whitespace-nowrap"
            disabled={!updatedTitle}
            onClick={() => movie?.id && update.mutate()}
          >
            {update.isPending ? `Updating...` : `Update`}
          </button>
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={() => movie?.id && deletion.mutate()}
        >
          {deletion.isPending ? `Deleting...` : `Delete Movie`}
        </button>
      </div>
    </>
  );
}
