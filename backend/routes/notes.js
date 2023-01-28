const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleWare/fetchUser");
const Note = require("../models/Note");
const app=express()
const cors=require("cors")
app.use(cors)
// Route to get all the notes using GET request
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log(req.user);
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server occured");
  }
});

//Adding a new  note using  /addnote

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description should have atleast 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {}
  }
);

//ROute3update an existing note
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //fINd the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  }
);

// Find the note to be deleted and delete it
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;

    //fINd the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("not found");
    }

    //ALlow deletion only if user owns this note   
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"note has been deleted",note:note
     });
  }
);
module.exports = router;
