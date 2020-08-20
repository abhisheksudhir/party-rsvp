import React, { useContext, useEffect } from "react";
import GuestForm from "../guests/GuestForm";
import GuestCounter from "../guests/GuestCounter";
import GuestFilter from "../guests/GuestFilter";
import GuestSearch from "../guests/GuestSearch";
import Guests from "../guests/Guests";
import AuthContext from "../../context/authContext/authContext";
import GuestContext from "../../context/guestContext/guestContext";

const Home = () => {
  const { getUser } = useContext(AuthContext);
  const {clearGuests, getGuests} = useContext(GuestContext);

  useEffect(() => {
    getUser();
    // clearGuests();
    // console.log('clear guests ran');
    // getGuests();
    // console.log('get guests ran');
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app-container">
      <div className="main">
        <div className="filter">
          <GuestFilter />
          <GuestSearch />
        </div>
        <GuestForm />
        <GuestCounter />
      </div>
      <Guests />
    </div>
  );
};

export default Home;
