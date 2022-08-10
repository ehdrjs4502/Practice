import './App.css';
import { useEffect, useState } from "react";
import Movie from './components/Movie';
import TopContainer from './components/TopContainer';
import Slide from './components/Slide'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = 'https://api.themoviedb.org/3/movie/now_playing?'
const API_KEY = '4488155143302172cf93dc5fb307ec3c'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w300/'
const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?'

function App() {
  const [Movies, setMovies]= useState([]);
  const [Genres, setGenres] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [count, setCount] = useState(true);
  const getMovies = async() => {
    const response = await fetch(
      `${API_URL}api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022`
      );
      const json = await response.json();

      if(!count) {
        json.results.sort((a, b) => a.release_date > b.release_date ? -1 : 1); // 날짜 순으로 정렬
      }

      console.log(json.results);

      setMovies(json.results);
      setLoading(false);
    }

  const getGenres = async() => {
    const response = await fetch(`${GENRES_URL}api_key=${API_KEY}`);
    const json = await response.json();

    console.log(json.genres);

    setGenres(json.genres);
  }

  useEffect(() => {
    getMovies();
    getGenres();
  },[count]) // 카운트가 바뀔떄마다 업데이트

  const prevBtn = () => {
    setCount((current) => !current);
  }

  console.log(count);
  return (
    <div>
      {Loading ? <h1>영화 가져오는 중...</h1> : 
      
      <div>
        <TopContainer/>
        <button onClick={prevBtn}>{count ? "최신순" : "인기순"}</button>
        <Slide Movies={Movies}/>
        <br/><br/><br/><hr/>    
          {Movies. map(movie => 
          <Movie Genres={Genres}
                key = {movie.id}
                id = {movie.id}
                title = {movie.title}
                summary = {movie.overview}
                image = {IMAGE_URL+movie.poster_path}
                date = {movie.release_date}
                genre = {movie.genre_ids}      
          />
        )}
        
    </div>
    }

    </div>
  );
}

export default App;
