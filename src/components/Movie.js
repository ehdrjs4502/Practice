
function Movie ({id, title, date, summary, image, genre, Genres}) {
    //console.log(genre.length);
    //console.log(Genres);
    //console.log(Genres.filter(x => x.id === genre[0]).map(genre => genre.name))
    //console.log(genre)
    return (
        <div>
            <img src={image === null ? '' : image} alt="image"/>
            <h2>{title} / {date}</h2>
            {Genres.filter(x => genre.indexOf(x.id) >= 0).map(genre => 
                <li>{genre.name}</li>)}
            <p>{summary === null ? "영화 줄거리 요약이 없는 영화입니다." : summary}</p>
            <hr/>
        </div>
    )
}

export default Movie;