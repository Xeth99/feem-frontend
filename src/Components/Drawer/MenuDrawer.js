import React from "react";
import MainDrawer from "./MainDrawer";
import { IoClose } from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import { FaFacebook, FaMedium, FaTelegram, FaYoutube } from "react-icons/fa";

function MenuDrawer({ drawerOpen, toggleDrawer }) {
  const active = "bg-dry text-subMain";
  const hover = "hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 px-4 py-4 items-center";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const Links = [
    {
      name: "Movies",
      link: "/movies",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const LinkDates = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/",
    },
    {
      icon: FaMedium,
      link: "https://www.medium.com/",
    },
    {
      icon: FaTelegram,
      link: "https://www.telegram.com/",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com/",
    },
  ];
  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
          <Link onClick={toggleDrawer} to="/">
            <img
              src="/images/logo.jpeg"
              alt=""
              className="w-28 h-28 object-contain"
            />
          </Link>
          <button
            onClick={toggleDrawer}
            type="button"
            className="flex justify-center items-center transitions w-10 h-10 text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white"
          >
            <IoClose />
          </button>
        </div>
        {/* menu links */}
        <div className="w-full overflow-y-scroll flex-grow max-height-full">
          <div className="pb-12 pt-4">
            {Links.map((link, index) => {
              const Icon = link.icon;
              return (
                <NavLink
                  to={link.link}
                  key={index}
                  onClick={toggleDrawer}
                  className={Hover}
                >
                  <Icon className="text-lg" />
                  {link.name}
                </NavLink>
              );
            })}
          </div>
          <div className="flex-rows gap-6 w-full">
            {LinkDates.map((link, index) => {
              const SocialIcon = link.icon;
              return (
                <a
                  href={link.link}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-colo w-12 h-12 transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
                >
                  <SocialIcon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MenuDrawer;
