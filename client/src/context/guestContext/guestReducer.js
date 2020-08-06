import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_SEARCH } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
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
    default:
      return state;
  }
};
