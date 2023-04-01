import React, { useState, useEffect } from 'react';
import Photo from "./soojal.jpg";

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [amountLeft, setAmountLeft] = useState(0);

//   useEffect(() => {
//     // Fetch the wallet balance, transactions, photo, and amount left from an API
//     // and update the state accordingly
//     fetch('/api/wallet')
//       .then(response => response.json())
//       .then(data => {
//         setBalance(data.balance);
//         setTransactions(data.transactions);
//         setPhotoUrl(data.photoUrl);
//         setAmountLeft(data.amountLeft);
//       })
//       .catch(error => console.error(error));
//   }, []);

  return (
    <div>
      <h2 className='wallet-h2'>Wallet</h2>
      <img src={Photo} alt="User's profile" />
      <p>Balance: USD</p>
      <p>Amount left:  USD</p>
      {/* <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.amount} USD
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Wallet;
