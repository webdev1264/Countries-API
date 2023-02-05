const Details = (props) => {
  const { toMainPage, countryDetails, fullCountryList, details } = props;
  const { region, subregion, population } = countryDetails;
  const commonName = countryDetails.name.common;
  const nativeName = countryDetails.name.official;
  const capital = countryDetails.capital ? countryDetails.capital[0] : [];
  const tld = countryDetails.tld[0];
  const currencies = countryDetails.currencies
    ? Object.values(countryDetails.currencies)
    : [];
  const languages = countryDetails.languages
    ? Object.values(countryDetails.languages)
    : [];
  const { svg, alt } = countryDetails.flags;
  const borders = countryDetails.borders ? countryDetails.borders : [];

  return (
    <div className="p-7">
          <div className="text-left mx-auto max-w-lg">
      <button
        className="btn flex items-center border-solid bg-white shadow-lg border-black ml-10 mt-16 w-32 h-10"
        onClick={toMainPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 ml-5 mr-2"
          viewBox="0 0 512 512"
        >
          <title>Arrow Back</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M244 400L100 256l144-144M120 256h292"
          />
        </svg>
        Back
      </button>
      <img className="mt-16 w-full" src={svg} alt={alt}></img>

      <h1 className="font-bold mt-5 text-2xl">{commonName}</h1>
      <p className="mt-5">
        <span className="font-bold">Native name: </span>
        {nativeName}
      </p>
      <p className="mt-3">
        <span className="font-bold">Population: </span>
        {population}
      </p>
      <p className="mt-3">
        <span className="font-bold">Region: </span>
        {region}
      </p>
      <p className="mt-3">
        <span className="font-bold">Sub Region: </span>
        {subregion}
      </p>
      <p className="mt-3">
        <span className="font-bold">Capital: </span>
        {capital}
      </p>
      <p className="mt-3">
        <span className="font-bold">Native name: </span>
        {nativeName}
      </p>
      <p className="mt-3">
        <span className="font-bold">Top Level Domain: </span>
        {tld}
      </p>
      <p className="mt-3">
        <span className="font-bold">Currencies: </span>
        {currencies.map(
          (currency, index) =>
            `${currency.name}${currencies.length - 1 === index ? "" : ","}`
        )}
      </p>
      <p className="mt-3">
        <span className="font-bold">Languages: </span>
        {languages.map(
          (language, index) =>
            `${language}${languages.length - 1 === index ? "" : ","} `
        )}
      </p>
      <p className="mt-3">
        <span className="font-bold">Borders: </span>
      </p>
      <div className="flex flex-wrap gap-3 py-3">
        {borders.map((border, id) => {
          const borderName = fullCountryList.find(
            (country) => country.cca3 === border
          ).name.common;
          return (
            <button
              className="btn border-solid bg-white shadow-lg border-black w-32 min-h-10 p-2"
              key={id}
              onClick={() => details(borderName)}
            >
              {borderName}
            </button>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Details;
