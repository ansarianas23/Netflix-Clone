import React, { useEffect, useState } from 'react'
import "../components/Row.css"
import axios from '../axios';

const Row = ({title, fetchurl, isLargeRow = false}) => {
    const[movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original"

    useEffect(()=>{
        const fetchData = async () =>{
            const request = await axios.get(fetchurl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    },[fetchurl])

  return (
    <div className='row'>
        <h2 className='row__title'>{title}</h2>

        <div className='row__posters'>
            {movies.map(
                (movie) =>
                ((isLargeRow && movie.poster_path) ||
                 (!isLargeRow && movie.poster_path)) && (
                    <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path 
                    }`} alt={movie.name}
                    />
                )    
            )}
        </div>

    </div>
  )
}

export default Row
