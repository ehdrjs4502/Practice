import Netflix from '../image/netflix.png';
import Search from '../image/search.png';
import styles from '../css/main.module.css'

function TopContainer() {
    return (
      <div className={styles.fixed}>
        <div className={styles.top_container}>
          <div>
            <img src={Netflix} alt='netflix' className={styles.main_banner}></img>
            <ul className={styles.category}>
              <li><a href='#'>홈</a></li>
              <li><a href='#'>TV 프로그램</a></li>
              <li><a href='#'>영화</a></li>
              <li><a href='#'>넷플릭스 오리지널</a></li>
              <li><a href='#'>최신 등록 콘텐츠</a></li>
              <li><a href='#'>내가 찜한 콘텐츠</a></li>
            </ul>
          </div>

          <ul className={styles.icon_list}>
            <li><img src={Search} className={styles.icons}></img></li>
            <li className={styles.icons}><img src={require('../image/bell.png')} className={styles.icons}></img></li>
            <li className={styles.icons}><img src={require('../image/user.png')} className={styles.icons}></img></li>
          </ul>
        </div>
      </div>
    )
}



export default TopContainer;