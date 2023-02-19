import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Country from "./Components/Country";
import Details from "./Components/Details";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import "./App.css";

let fullCountryList = [];
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

function App() {
  const [showDetails, setShowDetails] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [colorTheme, setColorTheme] = useState(currentTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data);
          return;
        }
        setCountryList(data);
        fullCountryList = data;
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  const detailsHandler = (name) => {
    setShowDetails(
      fullCountryList.find((country) => country.name.common === name)
    );
  };

  const toMainPageHandler = () => {
    setShowDetails(null);
    setCountryList(fullCountryList);
  };

  const filterAndFindHandler = (name, region) => {
    if (region === "Filter by region") {
      region = "";
    }
    setCountryList(
      fullCountryList
        .filter((country) => country.region.includes(region))
        .filter((coutnry) => coutnry.name.common.includes(name))
    );
  };

  const changeThemeHandler = () => {
    const theme = colorTheme === "dark" ? "light" : "dark";
    setColorTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <main className={`App ${colorTheme}-theme`}>
      <Header colorTheme={colorTheme} changeTheme={changeThemeHandler} />
      {showDetails ? (
        <Details
          toMainPage={toMainPageHandler}
          countryDetails={showDetails}
          fullCountryList={fullCountryList}
          details={detailsHandler}
        />
      ) : error ? (
        <Error error={error} />
      ) : !isLoaded ? (
        <Loader />
      ) : (
        <>
          <Nav filterAndFind={filterAndFindHandler} />
          <div className="p-7 h-min">
            {countryList.map((country, id) => (
              <Country key={id} {...country} details={detailsHandler} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
