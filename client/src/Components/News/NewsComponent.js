import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import "./Newscomponent.css"
import Loader from '../Loader';

function NewsComponent() {
const [ch,setch]=useState(false);
  const [data, setdata] = useState([]);
  const url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=H9W3SHVG4UI403M4";
  const funcData = async () => {
    const response = await fetch(url);
    const aa = await response.json();
    setdata(aa["feed"]);
    console.log(aa["feed"]);
  }
  useEffect(() => {
    funcData();
    setTimeout(() => {
      setch(true);
    }, 2000);
    console.log(data);
  })


  return (
    <>
    {data!=undefined &&   <div className='maindivnews'>
      <h1>Trending News of Stock Market</h1>
      <div className='news-component'>
        {
          data.map((element, key) => {
            return (
              <NewsCard
              title={element.title}
              description={element.summary}
              imgurl={element.banner_image}
              authors={element.authors}
              date={element.time_published}
              readmore={element.url}
              key={key} />
              );
            })
          }
      </div>
    </div>}
  {data==undefined &&
    <Loader/>}
          </>
  )
}

export default NewsComponent