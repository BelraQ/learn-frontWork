import React, { useState, useEffect } from "react";

const CoinTracker = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Hi</h1>
        {loading ? <strong>loading...</strong> : null}
      </div>
      <ul>
        {coins.map((coin, i) => (
          <li key={coin + i}>
            {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CoinTracker;