import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUESTS,
  GUESTS_ERROR,
  CLEAR_GUESTS,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case GET_GUESTS:
      return {
        ...state,
        guests: payload,
        errors: null,
      };

    case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, payload],
      };
    case REMOVE_GUEST:
      return {
        ...state,
        guests: state.guests.filter((guest) => guest._id !== payload),
      };
    case UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map((guest) =>
          guest._id === payload._id ? payload : guest
        ),
      };
    case EDIT_GUEST:
      return {
        ...state,
        editable: payload,
      };
    case CLEAR_EDIT:
      return {
        ...state,
        editable: null,
      };
    case GUESTS_ERROR:
      return {
        ...state,
        // guests: [],
        errors: payload,
      };
    case SEARCH_GUEST:
      const regex = new RegExp(`${payload}`, "gi");
      //       The g and i modifiers have these meanings:
      //          g = global, match all instances of the pattern in a string, not just one
      //          i = case-insensitive (so, for example, /a/i will match the string "a" or "A".
      return {
        ...state,
        search: state.guests.filter((guest) => guest.name.match(regex)),
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: null,
      };
    case TOGGLE_FILTER:
      return { ...state, filterGuest: !state.filterGuest };
    case CLEAR_GUESTS:
      return {
        ...state,
        filterGuest: false,
        search: null,
        editable: null,
        guests: [],
        errors: null,
      };
    default:
      return state;
  }
};
