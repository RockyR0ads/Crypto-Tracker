import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetPrices = () => {

  const [coins, setCoins] = useState([]);
  const [oneHRChange, setoneHRChange] = useState([]);
  const [twentyFourHRChange, settwentyFourHRChange] = useState([]);
  const [priceArr, setPriceArr] = useState([]);
  
  const [tempArr, setTempArr] = useState([]);
  const [tempArr2, setTempArr2] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [tester, setTester] = useState(0);
  
  let counter = 1;
 

  const test = () => {
    
    setTimeout(() => {
    setTester(tester => tester+1)
    console.log(tester)
 
    }, 10000);
  }
  
  useEffect(() => {
    axios
      .get(
        'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,XRP,BCH,BSV,LTC,BNB,EOS,ADA&tsyms=USD&api_key={362a965976ce99a80e7e7955dbb0353c2d9db8df0ecd2817c32052ea3453b07f}'
      )
      .then((res) => {

        let cryptos = res.data;
        let tempCoins = cryptos['DISPLAY'];
        setCoins(tempCoins);
        colourChange(tempCoins);
        if(loaded){
          initValues(tempCoins);
          
        }else{
          updateValues(tempCoins);
        }

        // force useEffect to run every 10 seconds
        test();
        console.log("latest BTC price " + tempCoins['BTC'].USD.PRICE)
  
       
      });
      
  }, [tester]);


  function initValues(tempCoins){
    console.log("init values ran")
    
    Object.keys(tempCoins).map((key,id) => {
      console.log(tempCoins[key].USD.CHANGEPCTHOUR)
      setoneHRChange(oneHRChange => [...oneHRChange, tempCoins[key].USD.CHANGEPCTHOUR]);
      setPriceArr(priceArr => [...priceArr, tempCoins[key].USD.PRICE]);

    
      });
      setLoaded(false)
  }

  function updateValues(tempCoins){
    setPriceArr([])
    setoneHRChange([])
    console.log(coins)
    Object.keys(coins).map((key,id) => {
      
      setoneHRChange(oneHRChange => [...oneHRChange, tempCoins[key].USD.CHANGEPCTHOUR]);
      settwentyFourHRChange(twentyFourHRChange => [...twentyFourHRChange, tempCoins[key].USD.CHANGEPCT24HOUR]);
      setPriceArr(priceArr => [...priceArr, tempCoins[key].USD.PRICE]);

      console.log(oneHRChange[id])
      
      });
  }
 

  function colourChange (tempCoins) {
    setTempArr([])
    setTempArr2([])
     
    Object.keys(coins).map((key,id) => {
      
      var check = Math.sign(tempCoins[key].USD.CHANGEPCTHOUR);
      var check2 = Math.sign(tempCoins[key].USD.CHANGEPCT24HOUR);
      console.log(coins[key].USD.CHANGEPCTHOUR);
      console.log(check);

      if (check === -1) {
        const color = '#ff0000';
        setTempArr((tempArr) => [...tempArr, color]);
        
      } else if(check === 0) {
        const color = '#FFFFFF';
        setTempArr((tempArr) => [...tempArr, color]);
      } else{
        const color = '#80ff00';
        setTempArr((tempArr) => [...tempArr, color]);
      }

      if (check2 === -1) {
        const color = '#ff0000';
        setTempArr2((tempArr2) => [...tempArr2, color]);
      } else if(check2===0) {
        const color = '#FFFFFF';
        setTempArr2((tempArr2) => [...tempArr2, color]);
      }else{
        const color = '#80ff00';
        setTempArr2((tempArr2) => [...tempArr2, color]);
      }


    });

    console.log('color change called')
    
   
  };

  



  return (
    
    <div className='fullTable'>
      <table className='table table-dark'>
        <thead>
          <tr id='tableHead'>
            <th  scope='col'>Rank</th>
            <th  scope='col'>Symbol</th>
            <th  scope='col'>Name</th>
            <th scope='col'>Price(USD)</th>
            <th scope='col'>1Hr Change</th>
            <th  scope='col'>24Hr Change</th>
            <th  scope='col'>24Hr Volume</th>
            <th scope='col'>Market Cap</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {Object.keys(coins).map((key, index) => (
            <tr className='roar'>
              <td id='rank' scope='row'>
                {counter++}
              </td>
              <td className="imageColumn">
                <img  className="image" src="https://cryptocompare.com/media/19633/btc.png"></img>
              </td>
              
              <td id='name'>{key}</td>
              {
                <td id='price'>
                  <NumberFormat
                    value={priceArr[index]}
                    
                    displayType={'text'}
                    decimalPrecision={2}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </td>
              }
              <td id='1hrChange' style={{ color: tempArr[index] }}>
                {oneHRChange[index]}%
                
              </td>

              <td id='24hrChange' style={{ color: tempArr2[index] }}>
                {twentyFourHRChange[index]}%
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
