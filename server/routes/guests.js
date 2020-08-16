const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//Guest Model
const Guest = require("../models/Guest");

// @route Get /guests
// @des Get guests
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.json(guests);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /guests
// @des Add new guest
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please provide the name").not().isEmpty(),
      check("phone", "Please provide the phone").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, dietary, isconfirmed } = req.body;

    try {
      const newGuest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isconfirmed,
      });
      const guest = await newGuest.save();

      res.json(guest);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route PUT /guests/:id
// @des update guest
// @access Private

router.put("/:id", auth, async (req, res) => {
  const { name, phone, dietary, isconfirmed } = req.body;

  // build Guest object
  const updatedGuest = { name, phone, dietary, isconfirmed };

  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ msg: "Guest not found" });
    // Making sure user owns the guest
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised to update guest" });
    }
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updatedGuest },
      { new: true }
    );
    res.send(guest);
  } catch (err) {
    console.errors(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /guests/:id
// @des Delete a guest
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);

    if (!guest) return res.status(404).json({ msg: "Guest not found" });

    // checking if user owns the guest
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised to delete guest" });
    }
    await Guest.findByIdAndRemove(req.params.id);
    res.send("Guest Removed successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
