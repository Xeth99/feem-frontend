import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { DateFormat } from "./Notifications/Empty";

function FlexMovieItems({ movie }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-0.5 w-[60%]">
        {movie.genre?.map((g, index) => (
          <span key={index} className="text-sm font-medium">
            {g}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2 w-full">
        <FaRegCalendarAlt className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">
          {DateFormat(movie.release_date)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <BiTime className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{movie.time} mins</span>
      </div>
    </>
  );
}

export default FlexMovieItems;
