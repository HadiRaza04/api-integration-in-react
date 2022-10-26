import { useState } from "react";
import './App.css';
import axios from 'axios';

//const axios = require('axios').default;

function App() {
  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");


  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: query, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'ae5f64c424msh09ca2ea377c79b4p17934djsn6a896f902a12',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.value);
      setData(response.data.value);
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div>

      <div className="searchBar">

      <form onSubmit={getNews}>
        <input type="text" placeholder="Enter your topic name" onChange = {(e) => {
          setQuery(e.target.value);
        }}/>

        <button type="submit">Get News</button>
      </form>
      </div>
      
      <div>{data.map(eachPost=> (<div>
        <h1>{eachPost.name}</h1>
        <span>{eachPost.datePublished}</span>
        <h3>{eachPost.description}</h3>
      </div>) )}</div>
    </div>
  );
}

export default App;
