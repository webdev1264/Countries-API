const Nav = ({ inputData, onChange }) => {


  return (
    <div className="p-7 mx-auto relative">
      <div className="input-wrapper w-full drop-shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-5 left-2 w-4"
          viewBox="0 0 512 512"
        >
          <title>Search</title>
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M338.29 338.29L448 448"
          />
        </svg>
        <input
          className="search w-full py-4 px-8 rounded-lg"
          placeholder="Search for a country..."
          onChange={onChange}
          name="search"
          value={inputData.search}
        />
      </div>
      <select
        className="filter rounded-lg border-none drop-shadow-md p-5 mt-12 block w-64"
        onChange={onChange}
        name="filter"
        value={inputData.filter ? inputData.filter : "Filter by region"}
      >
        <option value="Filter by region" disabled hidden>
          Filter by region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Nav;
