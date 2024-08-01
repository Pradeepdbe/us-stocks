import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  interface StockDetails {
    title: string;
    url: string;
    image: string;
    date: string;
    body: string;
    source: string;
    author: string;
  }
  const [stockDetails, setStockDetails] = useState<StockDetails[]>()
  useEffect(()=>{
    fetch("https://dummy-rest-api.specbee.site/api/v1/news")
    .then((res)=>res.json())
    .then(data => {
      console.log(data)
      setStockDetails(data);
      console.log("stockDetails",stockDetails)
    })
  },[])


  return (
    <div className="App">
      <div className="main-container">
        <div className="left-container">
          <div className="filtersContainer">
             <div>
                <p className="category">Category</p>
                <div className="filter-checkbox-container">
                    <p><input type="checkbox" value="" /> Benzinga </p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                </div>
             </div>
             <div>
                <p className="category">Author</p>
                <div className="filter-checkbox-container">
                    <p><input type="checkbox" value="" /> Benzinga</p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                    <p><input type="checkbox" value="" /> Benzinga</p>
                </div>
             </div>
             <div>
                <p className="category">Sort By</p>
                <div className="filter-checkbox-container">
                    <p><input type="checkbox" value="" /> Date</p>
                    <p><input type="checkbox" value="" /> Title</p>
                </div>
             </div>
          </div>
        </div>
        <div className="right-container">
          <div className="border-bottom">
              <div className="half-containers">
                    <div className="image-div">
                        <img className="stock-image" src="https://dummy-rest-api.specbee.site/sites/default/files/2023-12/Huawei-US-China-Shutterstock_0.jpeg" />                
                    </div>
                    <div className="title-div">
                            <p className="title-date-cat">
                              <span className="stock-date">December 21, 2023</span>
                              <span className="stock-category">Benzinga</span>
                            </p><br/>
                            <p className="title-text">Huawei Chips Away At Apple, Nvidia: Revenue Nears $100B As China Flexes Tech Muscle Despite US Sanctions - NVIDIA  ( NASDAQ:NVDA )</p>
                    </div>
                </div>
                <div>
                  <p className="description" >In a significant year for Huawei Technologies Co., the company's revenue soared by 9% in 2023, nearing a $100 billion milestone, following a surprising breakthrough in chip technology that challenged Apple Inc. AAPL and U.S. sanctions.</p><br/>
                  <p className='author'>Benzinga Neuro</p>
                </div>
          </div> 

          <div className="border-bottom">
              <div className="half-containers">
                    <div className="image-div">
                        <img className="stock-image" src="https://dummy-rest-api.specbee.site/sites/default/files/2023-12/Huawei-US-China-Shutterstock_0.jpeg" />                
                    </div>
                    <div className="title-div">
                            <p className="title-date-cat">
                              <span className="stock-date">December 21, 2023</span>
                              <span className="stock-category">Benzinga</span>
                            </p><br/>
                            <p className="title-text">Huawei Chips Away At Apple, Nvidia: Revenue Nears $100B As China Flexes Tech Muscle Despite US Sanctions - NVIDIA  ( NASDAQ:NVDA )</p>
                    </div>
                </div>
                <div>
                  <p className="description" >In a significant year for Huawei Technologies Co., the company's revenue soared by 9% in 2023, nearing a $100 billion milestone, following a surprising breakthrough in chip technology that challenged Apple Inc. AAPL and U.S. sanctions.</p><br/>
                  <p className='author'>Benzinga Neuro</p>
                </div>
          </div> 

          <div className="border-bottom">
              <div className="half-containers">
                    <div className="image-div">
                        <img className="stock-image" src="https://dummy-rest-api.specbee.site/sites/default/files/2023-12/Huawei-US-China-Shutterstock_0.jpeg" />                
                    </div>
                    <div className="title-div">
                            <p className="title-date-cat">
                              <span className="stock-date">December 21, 2023</span>
                              <span className="stock-category">Benzinga</span>
                            </p><br/>
                            <p className="title-text">Huawei Chips Away At Apple, Nvidia: Revenue Nears $100B As China Flexes Tech Muscle Despite US Sanctions - NVIDIA  ( NASDAQ:NVDA )</p>
                    </div>
                </div>
                <div>
                  <p className="description" >In a significant year for Huawei Technologies Co., the company's revenue soared by 9% in 2023, nearing a $100 billion milestone, following a surprising breakthrough in chip technology that challenged Apple Inc. AAPL and U.S. sanctions.</p><br/>
                  <p className='author'>Benzinga Neuro</p>
                </div>
          </div> 

          <div className="border-bottom">
              <div className="half-containers">
                    <div className="image-div">
                        <img className="stock-image" src="https://dummy-rest-api.specbee.site/sites/default/files/2023-12/Huawei-US-China-Shutterstock_0.jpeg" />                
                    </div>
                    <div className="title-div">
                            <p className="title-date-cat">
                              <span className="stock-date">December 21, 2023</span>
                              <span className="stock-category">Benzinga</span>
                            </p><br/>
                            <p className="title-text">Huawei Chips Away At Apple, Nvidia: Revenue Nears $100B As China Flexes Tech Muscle Despite US Sanctions - NVIDIA  ( NASDAQ:NVDA )</p>
                    </div>
                </div>
                <div>
                  <p className="description" >In a significant year for Huawei Technologies Co., the company's revenue soared by 9% in 2023, nearing a $100 billion milestone, following a surprising breakthrough in chip technology that challenged Apple Inc. AAPL and U.S. sanctions.</p><br/>
                  <p className='author'>Benzinga Neuro</p>
                </div>
          </div>            
        </div>
      </div>
    </div>
  );
}

export default App;
