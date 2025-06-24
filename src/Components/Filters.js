// import React, { Fragment, useEffect, useState } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import { FaAngleDown, FaCheck } from "react-icons/fa";
// import {
//   fetchGenres,
//   fetchLanguages,
//   generateYears,
// } from "../Data/FiltersData";

// function Filters({ onChange }) {
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [genreList, setGenreList] = useState([]);
//   const [languagesList, setLanguagesList] = useState([]);
//   const [yearList, setYearList] = useState([]);

//   useEffect(() => {
//     const loadFilters = async () => {
//       const genres = await fetchGenres();
//       const languages = await fetchLanguages();
//       const years = generateYears();

//       setGenreList(genres);
//       setLanguagesList(languages);
//       setYearList(years);
//     };

//     loadFilters();
//   }, []);

//   useEffect(() => {
//     onChange({
//       language: selectedLanguage?.value || "",
//       with_genres: selectedGenre?.value || "",
//       year: selectedYear?.value || "",
//     });
//   }, [selectedLanguage, selectedGenre, selectedYear]);

//   const Filter = [
//     {
//       value: selectedGenre,
//       onChange: setSelectedGenre,
//       items: genreList.map((g) => ({ title: g.name, value: g.id })),
//     },
//     {
//       value: selectedLanguage,
//       onChange: setSelectedLanguage,
//       items: languagesList.map((l) => ({
//         title: l.english_name || l.name,
//         value: l.iso_639_1,
//       })),
//     },
//     {
//       value: selectedYear,
//       onChange: setSelectedYear,
//       items: yearList,
//     },
//   ];

//   return (
//     <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
//       {Filter.map((item, index) => (
//         <Listbox key={index} value={item.value} onChange={item.onChange}>
//           <div className="relative">
//             <Listbox.Button className="relative border border-gray-800 w-full text-white  bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
//               <span className="block truncate">{item.value.title}</span>
//               <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
//                 <FaAngleDown className="h-4 w-4" aria-hidden="true" />
//               </span>
//             </Listbox.Button>
//             <Transition
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                 {item.items.map((option, i) => (
//                   <Listbox.Option
//                     key={i}
//                     className={({ active }) =>
//                       `relative cursor-default select-none py-2 pl-10 pr-4 ${
//                         active ? "bg-subMain text-white" : "text-main"
//                       }`
//                     }
//                     value={option}
//                   >
//                     {({ selected }) => (
//                       <>
//                         <span
//                           className={`block truncated ${
//                             selected ? "font-semibold" : "font-normal"
//                           }`}
//                         >
//                           {option.title}
//                         </span>
//                         {selected ? (
//                           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                             <FaCheck className="h-3 w-3" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </Listbox>
//       ))}
//     </div>
//   );
// }

// export default Filters;

import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {
  fetchGenres,
  fetchLanguages,
  generateYears,
} from "../Data/FiltersData";
import { updateFilters, fetchFilteredMovies } from "../Redux/Actions/MoviesActions";
import { useDispatch, useSelector } from "react-redux";

function Filters({ onFilterChange = () => {} }) {
  const dispatch = useDispatch();
  const [genreList, setGenreList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [yearList, setYearList] = useState([]);
  
  // Corrected selector path based on your store setup
  const { 
    isLoading, 
    isError, 
    filters 
  } = useSelector((state) => state.getAllMovies);

  // Initialize selected values from Redux state
  const [selectedGenre, setSelectedGenre] = useState(
    filters.genre ? { title: filters.genre, value: filters.genre } : null
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    filters.language ? { title: filters.language, value: filters.language } : null
  );
  const [selectedYear, setSelectedYear] = useState(
    filters.year ? { title: filters.year, value: filters.year } : null
  );

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [genres, languages] = await Promise.all([
          fetchGenres(),
          fetchLanguages()
        ]);
        
        setGenreList(genres);
        setLanguagesList(languages);
        setYearList(generateYears());
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    };
    
    loadFilters();
  }, []);

  // Handle filter changes
  useEffect(() => {
    const filters = {
      genre: selectedGenre?.value || "",
      language: selectedLanguage?.value || "",
      year: selectedYear?.value || "",
      page: 1
    };
    
    // Dispatch the action to fetch movies with these filters
    dispatch(fetchFilteredMovies(filters));
    
  }, [selectedGenre, selectedLanguage, selectedYear, dispatch]);

  // Rest of your component remains the same...
  const Filter = [
    {
      title: "Genre",
      value: selectedGenre,
      onChange: setSelectedGenre,
      items: genreList.map((g) => ({ title: g.name, value: g.id })),
      defaultTitle: "Select Genre",
    },
    // ... other filter definitions
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">
                {item.value?.title || item.defaultTitle}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaAngleDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {option.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}

      {/* Loading and error states */}
      {isLoading && (
        <div className="col-span-full text-center py-4">Loading...</div>
      )}
      {isError && (
        <div className="col-span-full text-center text-red-500 py-4">
          Error: {isError}
        </div>
      )}
    </div>
  );
}

export default Filters;
