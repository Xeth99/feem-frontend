import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../../Data/FiltersData";

function Footer() {
  const { search } = useParams();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLaguage] = useState(LanguageData[0]);

  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      time: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort by Language" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, times, rates, language, year, search]);

  const generateSearchLink = (newQueryParams) => {
    const currentQuery = queries;
    const mergedQuery = { ...currentQuery, ...newQueryParams };

    const queryString = new URLSearchParams(
      Object.entries(mergedQuery)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => [key, encodeURIComponent(value)])
    ).toString();

    return `/movies?${queryString}`;
  };
  const Links = [
    {
      title: "Company",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "About Us",
          link: "/about-us",
        },
        {
          name: "Contact Us",
          link: "/contact-us",
        },
        {
          name: "Movies",
          link: "/movies",
        },
      ],
    },
    {
      title: "Top Categories",
      links: [
        { name: "Action", link: generateSearchLink({ category: "Action" }) },
        { name: "Romance", link: generateSearchLink({ category: "Romance" }) },
        { name: "Drama", link: generateSearchLink({ category: "Drama" }) },
        {
          name: "Historical",
          link: generateSearchLink({ category: "Historical" }),
        },
      ],
    },
    {
      title: "My  Account",
      links: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "My Favorite",
          link: "/favorite",
        },
        {
          name: "My Profile",
          link: "/profile",
        },
        {
          name: "Change Password",
          link: "/password",
        },
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 bprder=t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb:0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb:-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img
                src="/images/logo.jpeg"
                alt="logo"
                className="w-2/4 object-contain h-12"
              />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>
                Suite B1, Apo Resettlement, Apo. <br /> Abuja, Nigeria
              </span>
              <br />
              <span>Tell: +234 9034 525 038</span>
              <br />
              <span>Email: emmanuelfemi01@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
