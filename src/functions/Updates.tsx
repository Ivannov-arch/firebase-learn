import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
// import { getMovies } from "./Get";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteMovie = async (data: { id: string }) => {
  if (!data.id) return;
  const movieDoc = doc(db, "movies", data.id);
  await deleteDoc(movieDoc);
  // setMovieList(MovieList.filter((movie) => movie.id !== id));
  // getMovies();
};
export const useDeleteMovie = (data: { id: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => deleteMovie(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (error) => console.error("Terjadi kesalahan:", error),
  });
};

const updateMovie = async (data: { id: string; updatedTitle: string }) => {
  const movieDoc = doc(db, "movies", data.id);
  await updateDoc(movieDoc, { title: data.updatedTitle });
  // getMovies();
};

export const useUpdateMovie = (data: { id: string; updatedTitle: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => updateMovie(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (error) => console.error("Terjadi kesalahan:", error),
  });
};
