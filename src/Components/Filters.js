import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {
  LanguageData,
  RatesData,
  TimesData,
  generateYears,
  fetchGenres,
} from "../Data/FiltersData.js";

function Filters(props) {
  const {
    categories,
    category,
    setCategory,
    year,
    setYear,
    times,
    setTimes,
    rates,
    setRates,
    language,
    setLaguage,
  } = props?.data;

  const [languagesList, setLanguagesList] = useState(LanguageData());
  const [YearData] = useState(generateYears());
  const [genre, setGenre] = useState(fetchGenres());

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await LanguageData(); 
        const formatted = res.map((lang) => ({
          title: lang.english_name || lang.name || lang.iso_639_1,
        }));
        setLanguagesList(formatted);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLanguagesList([{ title: "Failed to load languages" }]);
      }
    };
    fetchLanguages();
  }, []);

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        genre?.length > 0
          ? [{ title: genre }]
          : [{ title: "No category found!" }],
    },
    {
      value: language,
      onChange: setLaguage,
      items: languagesList,
    },
    // {
    //   value: year,
    //   onChange: setYear,
    //   items: YearData,
    // },
    // {
    //   value: times,
    //   onChange: setTimes,
    //   items: TimesData,
    // },
    // {
    //   value: rates,
    //   onChange: setRates,
    //   items: RatesData,
    // },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white  bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
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
    </div>
  );
}

export default Filters;
