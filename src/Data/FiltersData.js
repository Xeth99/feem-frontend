import axios from "axios";

// export const fetchNowPlayingMovies = async (params = {}) => {
//   try {
//     const { language, region, page, with_genres } = params;
    
//     const response = await axios.get(`${process.env.REACT_APP_TMDB_API_URL}/movie/now_playing`, {
//       params: {
//         api_key: process.env.REACT_APP_TMDB_API_KEY,
//         ...(language && { language }),
//         ...(region && { region }),
//         ...(page && { page }),
//         ...(with_genres && { with_genres }),
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch movies:", error);
//     return [];
//   }
// };

// const tmdbApiCall = async (endpoint, params = {}) => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_TMDB_API_URL}${endpoint}`, {
//       params: {
//         api_key: process.env.REACT_APP_TMDB_API_KEY,
//         ...params,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`TMDB API Error (${endpoint}):`, error);
//     throw error;
//   }
// };

// export const fetchGenres = async () => {
//   try {
//     const data = await tmdbApiCall('/genre/movie/list');
//     return data.genres || [];
//   } catch {
//     return [];
//   }
// };

// export const fetchLanguages = async () => {
//   try {
//     return await tmdbApiCall('/configuration/languages');
//   } catch {
//     return [];
//   }
// };

// export const generateYears = () => {
//   const currentYear = new Date().getFullYear();
//   return Array.from(
//     { length: currentYear - 1950 + 1 },
//     (_, i) => ({ title: `${currentYear - i}`, value: currentYear - i })
//   );
// };
