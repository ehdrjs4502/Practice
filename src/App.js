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

const requests = {
  fetchTrending: `/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022&with_genres=99`,
  fetchFindTest: `/find/616037?api_key=${API_KEY}&language=ko-KR&external_source=imdb_id`,
}

function App() {
  const external_id = '616037'
  const [Movies, setMovies]= useState([]);
  const [Find, setFind] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Loading, setLoading] = useState(true);
  const getMovies = async() => {
    const response = await fetch(
      `${API_URL}api_key=${API_KEY}&language=ko-KR&region=KR&page=1&primary_release_year=2022`
      );
      const json = await response.json();

      /*
      if(!count) {
        json.results.sort((a, b) => a.release_date > b.release_date ? -1 : 1); // 날짜 순으로 정렬
      }
      */

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

  const findMovies = async() => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${external_id}?api_key=${API_KEY}&language=ko-KR&region=KR&&append_to_response=images,credits`
      );
      const json = await response.json();
      console.log("찾은 영화 : ",json);
      setFind(json.results);
    }

  useEffect(() => {
    getMovies();
    getGenres();
    findMovies();
  },[]) // 카운트가 바뀔떄마다 업데이트

  return (
    <div>
      {Loading ? <h1>영화 가져오는 중...</h1> : 
      <div>
        <TopContainer/>
        <Slide title="지금 뜨는 콘텐츠" fetchURL={requests.fetchTrending}/>
        <Slide title="넷플릭스 오리지널" fetchURL={requests.fetchNetflixOriginals}/>
        <Slide title="인기 순위" fetchURL={requests.fetchTopRated}/>
        <Slide title="액션 영화" fetchURL={requests.fetchActionMovies}/>
        <Slide title="코미디 영화" fetchURL={requests.fetchComedyMovies}/>
        <Slide title="호러 영화" fetchURL={requests.fetchHorrorMovies}/>
        <Slide title="로맨스 영화" fetchURL={requests.fetchRomanceMovies}/>
        <Slide title="다큐멘터리 영화" fetchURL={requests.fetchDocumentaries}/>
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
