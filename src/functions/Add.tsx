import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const schema = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    releaseDate: z.number(),
    hasAnOscar: z.boolean(),
    userId: z.string().optional(),
  })
  .passthrough();

type newMovie = z.infer<typeof schema>;

const addMovie = async (data: newMovie) => {
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
