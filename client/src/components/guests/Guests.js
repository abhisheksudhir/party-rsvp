import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AuthContext from "../../context/authContext/authContext";
import GuestContext from "../../context/guestContext/guestContext";
import Guest from "./Guest";

const Guests = () => {
  const context = useContext(GuestContext);
  const { loading, getUser } = useContext(AuthContext);
  const { guests, filterGuest, search, getGuests } = context;

  useEffect(() => {
    getUser();
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
    <div>
      <TransitionGroup className="guests">
        {search !== null
          ? search.map((guest) => (
              <CSSTransition key={guest._id} timeout={300} classNames="item">
                <Guest guest={guest} />
              </CSSTransition>
            ))
          : guests
              .filter((guest) => !filterGuest || guest.isconfirmed)
              .map((guest) => (
                <CSSTransition key={guest._id} timeout={300} classNames="item">
                  <Guest guest={guest} />
                </CSSTransition>
              ))}
      </TransitionGroup>
      {/* {search !== null
        ? search.map((guest) => <Guest key={guest._id} guest={guest} />)
        : guests
            .filter((guest) => !filterGuest || guest.isconfirmed)
            .map((guest) => <Guest key={guest._id} guest={guest} />)} */}
    </div>
  );
};
export default Guests;
