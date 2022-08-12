import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../css/slick.css";
import styles from '../css/slider.module.css'

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = '4488155143302172cf93dc5fb307ec3c'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w300/'

function Slide({title, fetchURL}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}${fetchURL}`
        );
        const json = await response.json();
        console.log(title,json.results);
        setMovies(json.results);
    }
    
    fetchData();

  },[fetchURL])

  const settings = {
    className: "center",
    infinite: false, // 반복해서 보여줄지말지
    slidesToShow: 6.07, // 화면에 보여줄 사진 개수
    speed:600, //슬라이드 넘어가는 속도
    swipeToSlide: true,

    responsive: [ // 반응형 웹 구현 옵션
  {  
    breakpoint: 960, //화면 사이즈 960px일 때
    settings: {
      //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
      slidesToShow:3 
    } 
  },
  { 
    breakpoint: 768, //화면 사이즈 768px일 때
    settings: {	
      //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
      slidesToShow:2 
    } 
  }
],

    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };


  return (
    <div className={styles.slider}>
      <h1>{title}</h1>
      <Slider {...settings}>
        {movies.map(movie => 
          <li className={styles.slide_li}><a href="#"><img src={IMAGE_URL+movie.backdrop_path} alt="image" className={styles.img}/></a>
            <span className={styles.movie_title}>{movie.title}{movie.name}</span>
          </li>
          )}
      </Slider>
    </div>
  );
}

export default Slide;