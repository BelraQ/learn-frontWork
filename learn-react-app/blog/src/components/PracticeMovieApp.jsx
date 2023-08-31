import React, {useState, useEffect, useCallback} from 'react';
import Movie from './Movie';

const PracticeMovieApp = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = useCallback(async () => {
        const json = await (await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`))
                                .json();
        setMovies(json.data.movies);
        setLoading(false);
    });

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
                            <Movie key={movie.id} movie={movie}/>
                        );
                    })
                }
            </div>
        </>
    );
};

export default PracticeMovieApp;