import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

import { Button } from "../components/Button";

import "../styles/sidebar.scss";

export function SideBar() {
  const { genres, selectedGenreId, changeGenre } = useContext(MoviesContext);

  function handleClickButton(id: number) {
    changeGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
