import React, { useRef, useContext } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestSearch = () => {
  const { searchGuest, clearSearch } = useContext(GuestContext);
  const searchValue = useRef("");
  const handelChange = (e) => {
    if (searchValue.current.value !== "") {
      searchGuest(e.target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
      <input
        ref={searchValue}
        onChange={handelChange}
        type="text"
        className="search"
        placeholder=" Search Guest by name ..."
      />
      <i className="fas fa-search search-icon" />
    </div>
  );
};

export default GuestSearch;
