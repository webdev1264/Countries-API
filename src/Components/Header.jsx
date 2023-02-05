const Header = (props) => {
  const { colorTheme, changeTheme } = props;
  return (
    <div className="header-container flex justify-between drop-shadow-sm px-7 py-14">
      <p className="font-bold">Where in the world?</p>
      <div className="flex justify-center cursor-pointer" onClick={changeTheme}>
        <svg
          className="w-4 mr-2.5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <title>Moon</title>
          <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
        <p>{`${colorTheme === "dark" ? "Light" : "Dark"} Mode`}</p>
      </div>
    </div>
  );
};

export default Header;
