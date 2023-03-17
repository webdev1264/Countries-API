import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Country from "./Components/Country";
import Details from "./Components/Details";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import { firstCharCap } from "./data/utils/firstCharCap";
import "./App.css";

let initialCountryList = [];
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

function App() {
  const [inputData, setInputData] = useState({ search: "", filter: "" });
  const [countryList, setCountryList] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [colorTheme, setColorTheme] = useState(currentTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // fetch("https://restcountries.com/v3.1/all")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.message) {
    //       setError(data);
    //       return;
    //     }
    //     initialCountryList = data;
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setError(error);
    //   })
    //   .finally(() => {
    //     setCountryList(initialCountryList);
    //     setIsLoaded(true);
    //   });

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cacheData = localStorage.getItem("cacheCountryList");
        if (!cacheData) {
          initialCountryList = JSON.parse(cacheData);
          setCountryList(initialCountryList);
        } else {
          const response = await fetch("https://restcountries.com/v3.1/all");
          const data = await response.json();
          if (data.message) {
            setError(data);
            return;
          }
          initialCountryList = data;
          setCountryList(initialCountryList);
          localStorage.setItem(
            "cacheCountryList",
            JSON.stringify(initialCountryList)
          );
        }
      } catch (error) {
        console.log("Error: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
    if (name === "search") {
      filterCountryList(value);
    } else {
      filterCountryList(inputData.search, value);
    }
  };

  const handleDetails = (name) => {
    setShowDetails(
      initialCountryList.find((country) => country.name.common === name)
    );
  };

  const handleToMainPage = () => {
    setShowDetails(null);
  };

  const handleThemeChange = () => {
    const theme = colorTheme === "dark" ? "light" : "dark";
    setColorTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const filterCountryList = (search, filter = inputData.filter) => {
    const nextCountryList = initialCountryList.filter((country) => {
      return (
        country.region === filter &&
        country.name.common.includes(firstCharCap(search))
      );
    });
    setCountryList(nextCountryList);
  };

  return (
    <main className={`App ${colorTheme}-theme`}>
      <Header colorTheme={colorTheme} changeTheme={handleThemeChange} />
      {showDetails ? (
        <Details
          toMainPage={handleToMainPage}
          countryDetails={showDetails}
          initialCountryList={initialCountryList}
          details={handleDetails}
        />
      ) : error ? (
        <Error error={error} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <Nav inputData={inputData} onChange={handleOnChange} />
          <div className="p-7 h-min">
            {countryList.map((country) => (
              <Country
                key={country.name.common}
                {...country}
                details={handleDetails}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default App;
