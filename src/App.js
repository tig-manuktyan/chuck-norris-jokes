import React, { useState, useEffect, useRef } from "react";
import ChuckNorris from "./assets/images/ChuckNorris.png";
import "./style.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  }
  return [];
};

const App = () => {
  const [data, setData] = useState(null);
  const increment = useRef(null);
  const [jokes, setJokes] = useState(getLocalItems());

  const getJokes = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const movies = await response.json();
    setData(movies);
    return movies;
  };

  const handleStart = () => {
    getJokes();
    increment.current = setInterval(async () => {
      getJokes();
    }, 3000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
  };

  const addedList = () => {
    if (jokes.includes(data?.value)) {
      return deleteItem(jokes.indexOf((i) => i == data?.value));
    }
    if (jokes.length <= 10) {
      return setJokes([...jokes, data?.value]);
    }
    let getListsArray = JSON.parse(localStorage.getItem("lists"));
    if (a.length > 1) {
      getListsArray.shift();
      localStorage.removeItem("lists");
      localStorage.setItem("lists", JSON.stringify(getListsArray));
      setJokes(getListsArray);
    }
  };

  const deleteItem = (index) => {
    const updateitems = [...jokes];
    updateitems.splice(index, 1);
    setJokes(updateitems);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(jokes));
  }, [jokes]);

  return (
    <div className="App">
      <div className="imagesBlock">
        <img src={ChuckNorris} />
      </div>
      <div className="jokesBlock">
        <p>{data ? data?.value : "No Jokes"}</p>
      </div>
      <div className="btnsGroup">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={addedList}>added</button>
      </div>
      <h2>Lists Jokes</h2>
      <div className="listsBlock">
        {!jokes.length && <p> no List</p>}
        {jokes?.map((item, index) => (
          <div key={index} className="listsItemBlock">
            <p>{item}</p>
            <button onClick={() => deleteItem(index)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
