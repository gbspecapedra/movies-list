import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

import { Genre, Movie } from "../models";

interface MoviesContextData {
  genres: Genre[];
  movies: Movie[];
  selectedGenreId: number;
  selectedGenre: Genre;
  changeGenre: (id: number) => void;
}

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextData);

export function MoviesProvider({ children, ...rest }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function changeGenre(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        selectedGenreId,
        selectedGenre,
        changeGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
