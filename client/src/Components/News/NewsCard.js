import React from 'react'
import "./Newscard.css"

function NewsCard(props) {
  const toDateString=(date)=>{
    let str=date.slice(0,8);
    let str2=[str.slice(0,4),str.slice(4,2),str.slice(6,2)];
    return str.slice(6,8)+"/"+str.slice(4,6)+"/"+str.slice(0,4);
  }
  return (
    <div className='newscard'>
        <div className='imgpart'>
        <img src={props.imgurl?props.imgurl:"https://www.benzinga.com/next-assets/images/schema-image-default.png"} alt="" />
        </div>
        <div className='content-part'>
           <h5 className='title'>{props.title}</h5>
           <p>
            {props.description}
            <a href={props.readmore} target='_blank'>Read more</a>
           </p>
           <div>
            <div className='date'>Published on: {toDateString(props.date)}</div>
            <div className='authors'>Author- {props.authors}</div>
           </div>
        </div>
    </div>
  )
}

export default NewsCard