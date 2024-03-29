import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMagnifyingGlass);

const SearchBar = ({ searchTerm, onSearch, onKeyPress }) => {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-gray-400 ml-2"
        />
      </span>
      <input
        type="text"
        placeholder="Search Product ..."
        value={searchTerm}
        onKeyPress={onKeyPress}
        onChange={onSearch}
        className="pl-10 pr-2 py-2 text-xl w-full rounded-full outline-none"
      />
    </div>
  );
};

export default SearchBar;
