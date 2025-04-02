import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Movie } from "../types/movie";

const addMovie = async (data: Movie) => {
  const moviesCollectionRef = collection(db, "movies");
  if (!data) return;
  await addDoc(moviesCollectionRef, {
    ...data,
    userId: auth.currentUser?.uid,
  });
  console.log(data);
  // getMovies();
};

export const useAddMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
    onError: (error) => console.error("Terjadi kesalahan:", error),
  });
};
