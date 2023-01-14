import React from 'react'
import '../components/HomeScreen.css'
import Banner from './Banner'
import Navbar from './Navbar'
import requests from '../Requests'
import Row from './Row'

const HomeScreen = () => {
  return (
    <div className='homeScreen'>
      <Navbar/>  
      <Banner/>

      <Row title="NETFLIX ORIGINALS" fetchurl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchurl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchurl={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchurl={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchurl={requests.fetchComedyMovies}/>
      <Row title="Horrer Movies" fetchurl={requests.fetchHorrerMovies}/>
      <Row title="Romance Movies" fetchurl={requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchurl={requests.fetchDocumentaries}/>
    </div>
  )
}

export default HomeScreen
