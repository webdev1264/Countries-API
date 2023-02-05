import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Country from "./Components/Country";
import Details from "./Components/Details";
import "./App.css";

let fullCountryList;
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

function App() {
  const [showDetails, setShowDetails] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [colorTheme, setColorTheme] = useState(currentTheme);

  useEffect(() => {
    try {
      fetch("https://restcountries.com/v3.1/all").then((response) =>
        response.json().then((data) => {
          setCountryList(data);
          fullCountryList = data;
        })
      );
    } catch (e) {
      console.error(e);
    }
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
      ) : (
        <>
          <Nav filterAndFind={filterAndFindHandler} />
          {countryList.map((country, id) => (
            <Country key={id} {...country} details={detailsHandler} />
          ))}
        </>
      )}
    </main>
  );
}

export default App;
