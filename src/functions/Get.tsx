import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

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

const moviesCollectionRef = collection(db, "movies");

export const getMovies = async () => {
  try {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        title: String(docData.title || ""),
        releaseDate: Number(docData.releaseDate || 2000),
        hasAnOscar: Boolean(docData.hasAnOscar || false),
      };
    }) as newMovie[];

    console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.log(error);
  }
};

export default function createGetMovieOptions() {
  return queryOptions({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
    staleTime: 1000 * 2,
    refetchInterval: 1000 * 2,
  });
}
