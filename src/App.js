import React from 'react';
import Header from './components/header/Header';
import Banner from './components/home/Banner';

function App() {
  return (
    <div className="font-bodyFont" >
        <h1>
          <Header />
          <Banner />
        </h1>
    </div>
  );
}

export default App;
