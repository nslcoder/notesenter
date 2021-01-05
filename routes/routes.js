const express = require("express");
const router = express.Router();

const { renderNewNote, createNote, findNote, updateNote, deleteNote, saveNote } = require("../controllers/controllers");

router.get("/new", renderNewNote);
router.post("/", createNote);
router.get("/:id", findNote);
router.put("/:id", updateNote, saveNote("edit"));
router.delete("/:id", deleteNote);

module.exports = router;