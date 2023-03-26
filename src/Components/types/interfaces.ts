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

export interface ErrorData {
  message: string;
}

export interface ErrorProps {
  error: {
    message: string;
  };
}

export interface DetailsProps {
  toMainPage: () => void;
  countryDetails: CountryData;
  initialCountryList: CountryData[];
  details: (name: string) => void;
}

export interface CountryProps extends CountryData {
  details: (name: string) => void;
}

export interface HeaderProps {
  colorTheme: string;
  changeTheme: () => void;
}

export interface NavProps {
  inputData: {
    search: string;
    filter: string;
  };
  onChange: (event: EventProp) => void;
  onFilterChange: (event: EventProp) => void;
}

export interface InputData {
  search: string;
  filter: string;
}
