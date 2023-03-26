import { useState, useEffect, useMemo } from "react";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Country from "./Components/Country";
import Details from "./Components/Details";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import Pagination from "./Components/Pagination";
import { firstCharCap } from "./data/utils/firstCharCap";
import { CountryData } from "./Components/types/interfaces";
import { EventProp } from "./Components/types/interfaces";
import { ErrorData } from "./Components/types/interfaces";
import { InputData } from "./Components/types/interfaces";
import "./App.css";

const initialInputData = {
  search: "",
  filter: "",
};

let initialCountryList: CountryData[] = [];
const currentTheme = localStorage.getItem("theme")
  ? (localStorage.getItem("theme") as string)
  : "light";

function App(): JSX.Element {
  const [inputData, setInputData] = useState<InputData>(initialInputData);
  const [showDetails, setShowDetails] = useState<CountryData | null>(null);
  const [colorTheme, setColorTheme] = useState<string>(currentTheme);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const countriesPerPage = 19;

  const filteredCountryList: CountryData[] = useMemo(() => {
    const { search, filter } = inputData;
    return filterCountryList(search, filter);
  }, [inputData]);

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const cacheData = localStorage.getItem("cacheCountryList");
      if (cacheData) {
        initialCountryList = JSON.parse(cacheData);
      } else {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        if (data.message) {
          setError(data);
          return;
        }
        initialCountryList = data;
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
      setTotalPages(Math.ceil(initialCountryList.length / countriesPerPage));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (event: EventProp) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
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

  function filterCountryList(search: string, filter: string) {
    const nextCountryList: CountryData | any = initialCountryList.filter(
      (country: CountryData) => {
        return (
          country.region === filter &&
          country.name.common.includes(firstCharCap(search))
        );
      }
    );
    setTotalPages(Math.ceil(nextCountryList.length / countriesPerPage));
    return nextCountryList;
  }

  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
          <div className="p-7 h-min flex flex-wrap">
            {filteredCountryList
              .slice(
                currentPage * countriesPerPage - countriesPerPage,
                currentPage * countriesPerPage
              )
              .map((country) => (
                <Country
                  key={country.name.common}
                  {...country}
                  details={handleDetails}
                />
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handleCurrentPage}
          />
        </>
      )}
    </main>
  );
}

export default App;
