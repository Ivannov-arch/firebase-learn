import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function MovieList() {
  const [MovieList, setMovieList] = useState<newMovie[]>([]);
  const moviesCollectionRef = collection(db, "movies");

  const [updatedTitle, setUpdatedTitle] = useState<string>("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<newMovie>({
    defaultValues: {
      title: "",
      releaseDate: 2000,
      hasAnOscar: false,
      userId: auth.currentUser?.uid || "",
    },
    resolver: zodResolver(schema),
  });

  const addMovie: SubmitHandler<newMovie> = async (data: newMovie) => {
    try {
      await addDoc(moviesCollectionRef, {
        ...data,
        userId: auth.currentUser?.uid,
      });
      console.log(data);
      getMovies();
    } catch (error) {
      setError("root", {
        message: "An error occurred while adding the movie",
      });
    }
  };

  const deleteMovie = async (id: string) => {
    if (!id) return;
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    setMovieList(MovieList.filter((movie) => movie.id !== id));
  };

  const updateMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovies();
  };
  const getMovies = async () => {
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
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <form className="p-3 border rounded" onSubmit={handleSubmit(addMovie)}>
        <input
          className="border rounded"
          {...register("title")}
          type="text"
          placeholder="Movie Title..."
        />
        <input
          className="border rounded"
          {...register("releaseDate")}
          type="number"
          placeholder="Release Date..."
        />
        <input
          className="border rounded"
          type="checkbox"
          {...register("hasAnOscar")}
          name="hasAnOscar"
        />{" "}
        <label htmlFor="hasAnOscar">Has an Oscar</label>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Add"}
        </button>
        {errors.root && (
          <div className="self-start text-red-500">{errors.root.message}</div>
        )}
      </form>

      <div>
        {MovieList.map((movie?) => (
          <div key={movie && movie?.id} className="my-3 p-3 border rounded">
            <h1
              className={movie?.hasAnOscar ? `text-green-500` : `text-red-500`}
            >
              {movie?.title}
            </h1>
            <p>Release Year: {movie?.releaseDate}</p>
            <button onClick={() => movie?.id && deleteMovie(movie.id)}>
              Delete Movie
            </button>

            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => movie?.id && updateMovie(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
