import React from 'react'
import "./TransactionCard.css"
function TransactionCard(props) {
  return (
    <div className='transactionCard'>
        <div className='transactItem'> {props.id.slice(0,12)}</div>
        <div className='transactItem' >{props.name}</div>
        <div className='transactItem'>{props.type}</div>
        <div className='transactItem'>₹{props.amount}/-</div>
        <div className='transactItem'>{props.date}</div>
    </div>
  )
}

export default TransactionCard