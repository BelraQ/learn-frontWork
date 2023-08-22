import React, {useState, useEffect} from 'react';

const PracticeMovieApp = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`))
                                .json();
        setMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);
    console.log(movies);
    return (
        <>
            {loading ? <h1>loading...</h1> : null}
            <div>
                {
                    movies.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <img src={movie.medium_cover_image} alt="영화 이미지" />
                                <h2>{movie.title}</h2>
                                <p>{movie.summary}</p>
                                <ul>
                                    {movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default PracticeMovieApp;