import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

import { MovieCard } from "../components/MovieCard";

import "../styles/content.scss";

export function Content() {
  const { movies, selectedGenre } = useContext(MoviesContext);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
