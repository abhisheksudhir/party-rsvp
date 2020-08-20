import React, { useState, useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestForm = () => {
  const context = useContext(GuestContext);
  const { addGuest, editable, updateGuest, clearEdit } = context;

  useEffect(() => {
    if (editable != null) {
      setGuest(editable);
    } else {
      setGuest({ name: "", phone: "", dietary: "Non-Veg" });
    }
  }, [editable, context]);

  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    dietary: "Non-Veg",
  });

  const { name, phone, dietary } = guest;

  const handleChange = (e) => {
    setGuest({
      ...guest,
      [e.target.name]: e.target.value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (editable !== null) {
      updateGuest(guest);
      clearEdit();
    } else {
      addGuest(guest);
    }
    setGuest({ name: "", phone: "", dietary: "Non-Veg" });
  };

  return (
    <div className="invite-section">
      <h1>{editable !== null ? "Edit Guest" : "Invite Someone"}</h1>
      <form onSubmit={onsubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">
            Non-veg
            <input
              type="radio"
              name="dietary"
              value="Non-Veg"
              checked={dietary === "Non-Veg"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Vegan
            <input
              type="radio"
              name="dietary"
              value="Vegan"
              checked={dietary === "Vegan"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Pascatarian
            <input
              type="radio"
              name="dietary"
              value="Pascatarian"
              checked={dietary === "Pascatarian"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input
          type="submit"
          value={editable !== null ? "Update Guest" : "Add Guest"}
          className="btn"
        />
        {editable !== null ? (
          <input
            onClick={clearEdit}
            type="button"
            className="btn clear"
            value="Cancel"
          />
        ) : null}
      </form>
    </div>
  );
};

export default GuestForm;
