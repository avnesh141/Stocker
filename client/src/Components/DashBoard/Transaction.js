import React, { useEffect, useState } from 'react'
import TransactionCard from './TransactionCard';
import "./TransactionCard.css"
function Transaction() {
// console.log("mounted");
const [transact,setTransact]=useState([]);

const GetTransact=async()=>{
  // console.log("inside GEt");
  const response =await fetch("/api/invest/transactions",
  {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      authtoken: JSON.stringify(localStorage.getItem("token")),
    },
  })
  // console.log(response);
  const json =await response.json();
  setTransact(Object.values(json)[0].reverse().slice(0,10));
  // const data= Object.values(json);
  // console.log(data);
  // console.log( Object.values(json)[0]);
}

useEffect(() => {
  GetTransact();
  // console.log(transact);
}, [])


  return (
    <div className='Transactionslist'>
      {transact!=null &&  transact.map((item,index)=>{
        return (
          <TransactionCard key={index} name={item.company} type={item.type} date={item.date} id={item.t_id} amount={item.price*item.number}/>
        );
      })}
    </div>
  )
}

export default Transaction