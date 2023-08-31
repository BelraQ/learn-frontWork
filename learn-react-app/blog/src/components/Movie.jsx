import React, { memo } from "react";
import { Link } from 'react-router-dom';

const Movie = memo(({movie}) => {
    return (
      <div>
        <img src={movie.medium_cover_image} alt="영화 이미지" />
        <h2><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h2>
        <p>{movie.summary.length > 235 ? movie.summary.slice(0, 235) + '...' : movie.summary}</p>
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    );
});

export default Movie;