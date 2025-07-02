import React,{useEffect,useState} from 'react'
import axios from '../../Axios'
import './RowPost.css'
import YouTube from 'react-youtube'
import {API_KEY, imageUrl} from '../../Constants/Constants'
import MovieCard from '../MovieCard/MovieCard'
import { useViewingHistory } from '../../context/ViewingHistoryContext'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')
    const { addToHistory } = useViewingHistory();

    useEffect(() => {
        axios.get(props.url).then(response=>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(err=>{
            console.log("Network Error:", err)
        })
    }, [props.url])
    
    const opts = 
    {
        height: '390',
        width: '100%',
        playerVars: 
        {
          // https://developers.google.com/youtube/player_parameters
          autoplay:1, 
        },
    };

    const handleMovie = (movie)=>{
        console.log(movie.id)
        // Add to viewing history when user clicks to watch
        addToHistory(movie);
        
        axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
           if(response.data.results.length!==0){
               setUrlId(response.data.results[0])
           }
           else{
               console.log("Array not Found")
           }
        })
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'> 
            {movies.map((obj, index)=>
                <MovieCard
                    key={index}
                    movie={obj}
                    onClick={() => handleMovie(obj)}
                    className={props.isSmall ? 'smallPoster' : 'poster'}
                />
            )}
            </div>
        {   urlId  &&  <YouTube opts={opts} videoId={urlId.key} /> }
        </div>
    )
}

export default RowPost