import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesClass from './components/Particles';
import GetPrices from './components/callCryptoAPI'
import GetTicker from './components/ticker';

function App() {
  return (
    <div className="app">
      
       <header className="head">
         
      <h1 className="font-weight-bold">Crypto Market Watch</h1>
       
       
      </header>
      
      <ParticlesClass/>
      <GetPrices/>

      

      <footer className="foot">
        <GetTicker/>
      </footer>
    </div>
    
    
  );
}

export default App;
