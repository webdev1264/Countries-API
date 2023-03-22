import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Country from "./Components/Country";
import Details from "./Components/Details";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import { firstCharCap } from "./data/utils/firstCharCap";
import "./App.css";

export interface CountryData {
  name: {
    common: string;
    official: string;
  };
  languages: {
    [index: string]: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  currencies: {
    [index: string]: {
      name: string;
      symbol: string;
    };
  };
  borders: string[];
  capital: string[];
  tld: string[];
  region: string;
  subregion: string;
  population: string;
  cca3: string;
}

export interface EventProp {
  target: {
    name: string;
    value: string;
  };
}

interface ErrorData {
  message: string;
}

let initialCountryList: CountryData[] = [];
const currentTheme = localStorage.getItem("theme")
  ? (localStorage.getItem("theme") as string)
  : "light";

function App(): JSX.Element {
  const [inputData, setInputData] = useState<{
    search: string;
    filter: string;
  }>({ search: "", filter: "" });
  const [countryList, setCountryList] = useState<CountryData[]>([]);
  const [showDetails, setShowDetails] = useState<CountryData | null>(null);
  const [colorTheme, setColorTheme] = useState<string>(currentTheme);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData | null>(null);

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

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const cacheData = localStorage.getItem("cacheCountryList");
        if (cacheData) {
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
        setError(error as ErrorData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (event: EventProp) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
    if (name === "search") {
      filterCountryList(value);
    } else {
      filterCountryList(inputData.search, value);
    }
  };

  const handleDetails = (name: string) => {
    const details: CountryData | any = initialCountryList.find(
      (country: CountryData) => country.name.common === name
    );
    setShowDetails(details);
  };

  const handleToMainPage = () => {
    setShowDetails(null);
  };

  const handleThemeChange = () => {
    const theme = colorTheme === "dark" ? "light" : "dark";
    setColorTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const filterCountryList = (search: string, filter = inputData.filter) => {
    const nextCountryList: CountryData | any = initialCountryList.filter(
      (country: CountryData) => {
        return (
          country.region === filter &&
          country.name.common.includes(firstCharCap(search))
        );
      }
    );
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
