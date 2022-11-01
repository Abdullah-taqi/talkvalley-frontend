import { React, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Axios from "axios";
import "./App.css"
// import logo from "../assets/logo.png"
// import {Link as Lnk} from 'react-router-dom'


function AdsList() {
  const [adsList, setAdsList] = useState([]);
  const [filteredData,setFilteredData] = useState(adsList);
  
  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    
    console.log(value.toLowerCase());
    result = adsList.filter((data) => {
        // console.log(data.ads_name.toLowerCase());
    return data.headline.toLowerCase().search(value) !== -1 || data.primaryText.toLowerCase().search(value) !== -1;
    });
    setFilteredData(result);
    }
  useEffect(() => {
    Axios.get('https://talk-valley.herokuapp.com/data')
    .then(response => {
    console.log(response.data.data);
    setAdsList(response.data.data);
    setFilteredData(response.data.data);
    })
    .catch(error => {
    console.log('Error getting fake data: ' + error);
    })
    }, []);

  return (
    <div>
        <div id="search-bar">
      <div id="search-icon">
        <FaSearch
          color="white"
        />
      </div>
      <div id="search-field">
        <input type="" placeholder="Search here" onChange={(event) =>handleSearch(event)}/>
      </div>
    </div>
      <div className="ads-container">
        <div className="ads-cards-container">
          <div className="ad-banners">
            {filteredData.map((value, i) => (
              <div>
                <div key={i}>
                  <div className="ads-card">
                    <div id="ad-img">
                    <img src={value.imgUrl} alt="new"/>
                    </div>
                    <div className="card-description">
                      <div id="top-desc">
                      <div id="title-status">
                        <h3 id="ads-card-title">Headline : {value.headline}</h3>
                      </div>
                      <p className="description">
                        <b>Primary text</b> : {value.primaryText} 
                      </p>
                      <p className="description">
                        <b>Description</b> : {value.description} 
                      </p>
                      </div>
                      <div id="bottom-desc">
                      <a href={value.link} rel="noreferrer" target='_blank'><button>{value.CTA}</button></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsList;
