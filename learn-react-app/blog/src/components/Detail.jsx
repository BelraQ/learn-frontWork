import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState();
    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = async () => {
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        if (json) {
            console.log(json.data.movie);
            setMovie(json.data.movie);
            setLoading(true);
        }
    }

    return (
      <>
        {loading || <h1>loading...</h1>}
        {loading && (
          <>
            <img src={movie.medium_cover_image} alt="영화 이미지"></img>
            <h2>{movie.title}</h2>
          </>
        )}
      </>
    );
}

export default Detail;