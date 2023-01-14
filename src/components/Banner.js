import React, { useEffect, useState } from 'react'
import "../components/Banner.css"
import axios from '../axios';
import requests from '../Requests';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
         const fetchData = async()=>{
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }

        fetchData();
    },[])

    // console.log(movie);

    // This function is to reduce the description length
    const truncate = (string, n)=>{
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
    }


  return (
    <header className='banner' style={{
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize:"cover",
        backgroundRepeat  : 'no-repeat',
        backgroundPosition:"center center",
    }}>
      
      <div className='banner__contents'>
        <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className='banner__buttons'>
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>

        <h1 className='banner__description'>
           {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className='banner__fadebottom'/>

    </header>
  )
}

export default Banner
