import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetPrices = () => {
  const [coins, setCoins] = useState([]);
  const [tempArr, setTempArr] = useState([]);
  const [tempArr2, setTempArr2] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let counter = 1;

  useEffect(() => {
    axios
      .get(
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,XRP,BCH,BSV,LTC,BNB,EOS,ADA&tsyms=USD&api_key={362a965976ce99a80e7e7955dbb0353c2d9db8df0ecd2817c32052ea3453b07f}'
      )
      .then((res) => {
        const cryptos = res.data;
        const tempCoins = cryptos['DISPLAY'];
        setCoins(tempCoins);
        setLoaded(true);
      });

    if (loaded) colourChange();
  }, [loaded]);

  const colourChange = () => {
    Object.keys(coins).map((key) => {
      var check = Math.sign(coins[key].USD.CHANGEPCTHOUR);
      var check2 = Math.sign(coins[key].USD.CHANGEPCT24HOUR);

      if (check === -1) {
        const color = '#ff0000';
        setTempArr((tempArr) => [...tempArr, color]);
      } else {
        const color = '#00cc00';
        setTempArr((tempArr) => [...tempArr, color]);
      }

      if (check2 === -1) {
        const color = '#ff0000';
        setTempArr2((tempArr2) => [...tempArr2, color]);
      } else {
        const color = '#00cc00';
        setTempArr2((tempArr2) => [...tempArr2, color]);
      }
    });
  };

  return (
    <div className='fullTable'>
      <table className='table table-dark'>
        <thead>
          <tr id='tableHead'>
            <th scope='col'>Rank</th>
            <th scope='col'>Name</th>
            <th scope='col'>Price(USD)</th>
            <th scope='col'>1Hr Change</th>
            <th scope='col'>24Hr Change</th>
            <th scope='col'>24Hr Volume</th>
            <th scope='col'>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(coins).map((key, index) => (
            <tr className='roar'>
              <td id='rank' scope='row'>
                {counter++}
              </td>

              <td id='name'>{key}</td>
              {
                <td id='price'>
                  <NumberFormat
                    value={coins[key].USD.PRICE}
                    displayType={'text'}
                    decimalPrecision={2}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </td>
              }
              <td id='1hrChange' style={{ color: tempArr[index] }}>
                {coins[key].USD.CHANGEPCTHOUR}%
              </td>

              <td id='24hrChange' style={{ color: tempArr2[index] }}>
                {coins[key].USD.CHANGEPCT24HOUR}%
              </td>

              <td id='24Volume'>{coins[key].USD.VOLUME24HOUR}</td>
              <td id='marketCap'>{coins[key].USD.MKTCAP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetPrices;
