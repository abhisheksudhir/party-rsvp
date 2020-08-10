import React, { useReducer } from "react";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
} from "../types";

const GuestState = (props) => {
  const initialState = {
    filterGuest: false,
    search: null,
    editable: null,
    guests: [
      { id: 1, name: "A", phone: "1", dietary: "Vegan", isconfirmed: false },
      { id: 2, name: "B", phone: "2", dietary: "Non-Veg", isconfirmed: true },
      {
        id: 3,
        name: "C",
        phone: "3",
        dietary: "Pascatarian",
        isconfirmed: true,
      },
      {
        id: 4,
        name: "Cook",
        phone: "3",
        dietary: "Pascatarian",
        isconfirmed: true,
      },
    ],
  };
  const [state, dispatch] = useReducer(guestReducer, initialState);

  const addGuest = (guest) => {
    dispatch({ type: ADD_GUEST, payload: guest });
  };

  const updateGuest = (guest) => {
    dispatch({ type: UPDATE_GUEST, payload: guest });
  };

  const editGuest = (guest) => {
    dispatch({ type: EDIT_GUEST, payload: guest });
  };

  const clearEdit = () => {
    dispatch({ type: CLEAR_EDIT });
  };

  const removeGuest = (id) => {
    dispatch({ type: REMOVE_GUEST, payload: id });
  };

  const toggleFilter = () => {
    dispatch({ type: TOGGLE_FILTER });
  };

  const searchGuest = (guest) => {
    dispatch({ type: SEARCH_GUEST, payload: guest });
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        filterGuest: state.filterGuest,
        search: state.search,
        editable: state.editable,
        addGuest,
        removeGuest,
        updateGuest,
        editGuest,
        clearEdit,
        toggleFilter,
        searchGuest,
        clearSearch,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};

export default GuestState;
