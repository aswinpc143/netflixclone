import React, { useEffect,useState } from 'react'
import {API_KEY,imageUrl} from '../../Constants/Constants'
import './Banner.css'
import axios from '../../Axios'
import { useMyList } from '../../context/MyListContext'

function Banner() {
   const [movie, setMovie] = useState()
   const { addToMyList, removeFromMyList, isInMyList } = useMyList();

    useEffect(() => {
        axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) =>{
            console.log(response.data.results[0])
            const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)]
            setMovie(randomMovie)
        })
    },[])

    const handleMyListClick = () => {
        if (!movie) return;
        
        if (isInMyList(movie.id)) {
            removeFromMyList(movie.id);
        } else {
            addToMyList(movie);
        }
    };

    return (
        <div 
        style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
        className='banner'>
            <div className='content'>
                <h1 className='title'>{movie ? (movie.title || movie.name) : ""}</h1>
                <div className='banner-buttons'> 
                    <button className= 'button play-button'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Play
                    </button>
                    <button className= 'button my-list-button' onClick={handleMyListClick}>
                        {movie && isInMyList(movie.id) ? (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                                </svg>
                                Remove from List
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                                </svg>
                                My List
                            </>
                        )}
                    </button>
                </div>
                    <h1 className='description'>{movie ? movie.overview : "" }</h1>
            </div> 
            <div className="fadebottom"></div>       
        </div>
    )
}

export default Banner