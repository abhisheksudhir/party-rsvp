import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";
import GuestContext from "../../context/guestContext/guestContext";
import Guest from "./Guest";

const Guests = () => {
  const { guests, filterGuest, search, getGuests } = useContext(GuestContext);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    getGuests();
    // eslint-disable-next-line
  }, []);

  if (guests === null || guests.length === 0) {
    return (
      <h3 className="no-guest">
        {loading ? "Loading guests..." : "Please add a guest"}
      </h3>
    );
  }

  return (
    <div className="guests">
      {search !== null
        ? search.map((guest) => <Guest key={guest._id} guest={guest} />)
        : guests
            .filter((guest) => !filterGuest || guest.isconfirmed)
            .map((guest) => <Guest key={guest._id} guest={guest} />)}
    </div>
  );
};
export default Guests;
