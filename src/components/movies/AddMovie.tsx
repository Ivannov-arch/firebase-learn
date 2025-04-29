import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { getMovies } from "../functions/Get";
import { useAddMovie } from "../../functions/Add";

import { auth } from "../../config/firebase";

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

export default function AddMovie() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newMovie>({
    defaultValues: {
      title: "",
      releaseDate: 2000,
      hasAnOscar: false,
      userId: "",
    },
    resolver: zodResolver(schema),
  });

  // Perbaiki nilai userId saat user login/logout
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    reset((prev) => ({
      ...prev,
      userId: uid || "",
    }));
  }, [reset]);

  const add = useAddMovie();
  const addMovie: SubmitHandler<newMovie> = async (data: newMovie) => {
    if (!data) return;
    try {
      await add.mutateAsync(data);
      reset();
    } catch (error) {
      setError("root", {
        message: "An error occurred while adding the movie",
      });
    } finally {
      reset();
    }
  };

  return (
    <>
      <form
        className="gap-2 grid grid-cols-1 p-3 border rounded"
        onSubmit={handleSubmit(addMovie)}
      >
        <input
          className="py-2 border rounded"
          {...register("title")}
          type="text"
          placeholder="Movie Title..."
        />
        <input
          className="py-2 border rounded"
          {...register("releaseDate", { valueAsNumber: true })}
          type="number"
          placeholder="Release Date..."
        />
        <div className="mb-2">
          <input
            className="border rounded"
            type="checkbox"
            {...register("hasAnOscar")}
          />{" "}
          <label htmlFor="hasAnOscar">Has an Oscar</label>
        </div>
        <button
          className={`bg-indigo-500 hover:bg-indigo-700 text-white ${isSubmitting && `bg-indigo-600`}`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Add"}
        </button>
        {errors.root && (
          <div className="self-start text-red-500">{errors.root.message}</div>
        )}
      </form>
    </>
  );
}
