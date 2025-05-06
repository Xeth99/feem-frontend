import axios from "axios";

// export const LanguageData = [
//   { title: "Sort by Language", value: "" },
//   { title: "English", value: "en" },
//   { title: "French", value: "fr" },
//   { title: "Spanish", value: "es" },
// ];
export const LanguageData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
  );
  return response.data;
  
};


export const RatesData = [
  {
    title: "Sort By Rates",
  },
  {
    title: "1 Star",
  },
  {
    title: "2 Stars",
  },
  {
    title: "3 Star",
  },
  {
    title: "4 Star",
  },
  {
    title: "5 Star",
  },
];

export const TimesData = [
  { title: "Sort By Hours" },
  { title: "1 Hour" },
  { title: "2 Hours" },
  { title: "3 Hours" },
  { title: "4 Hours" },
  { title: "5 Hours" },
  { title: "6 Hours" },
  { title: "7 Hours" },
  { title: "8 Hours" },
  { title: "9 Hours" },
  { title: "10 Hours" },
];

export const YearData = [
  { title: "Sort by Year", value: "" },
  { title: "2024", value: "2024" },
  { title: "2023", value: "2023" },
];

export const fetchGenres = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
  );
  return response.data.genres; // returns an array like [{ id: 28, name: "Action" }]
};

export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1950; y--) {
    years.push({ title: y.toString(), value: y.toString() });
  }
  return years;
};