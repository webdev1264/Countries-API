import { CountryProps } from "./types/interfaces";

const Country = (props: CountryProps) => {
  const { population, region, details } = props;
  const name = props.name.common;
  const capital = props.capital ? props.capital[0] : "N/A";
  const flag = props.flags.svg;
  return (
    <div
      className="country-wrapper mx-auto my-5 max-w-sm rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={() => details(name)}
    >
      <img className="w-full" src={flag} alt={name} />
      <div className="px-6 py-4 text-left">
        <h2 className="font-bold text-xl mb-2">{name}</h2>
        <div className="text-base">
          <p>
            <span className="font-bold">Population: </span>
            {population}
          </p>
          <p>
            <span className="font-bold">Region: </span>
            {region}
          </p>
          <p>
            <span className="font-bold">Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Country;
