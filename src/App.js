import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import './App.css';

function App() {
  const apiKey = "d981eeb277291643b98a51ac0fe7730a";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiURL).then((res) => {
      console.log("response", res.data);
      setData(res.data);
      setErrorMessage(""); // Clear any previous error message
    }).catch((err) => {
      console.log("err", err);
      setErrorMessage("Invalid Location. Please Try Again.");
      setData({}); // Clear previous data
    });
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  }

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input 
            type="text" 
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput} 
          />
          <button 
            className="btn btn-primary" 
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      
      {Object.keys(data).length > 0 && !errorMessage &&
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox" style={{ backgroundColor: 'white' }}>
            <img 
              className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" 
              alt="Weather Icon"
            />
            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weathorTemp">
              {((data?.main?.temp) - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      }

      {errorMessage && 
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox" style={{ backgroundColor: 'white' }}>
            <h5 className="weathorCity">
              {errorMessage}
            </h5>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
