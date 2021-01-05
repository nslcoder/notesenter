const express = require("express");
const router = express.Router();

const { renderNewNote, createNote, findNote, updateNote, deleteNote } = require("../controllers/controllers");

router.get("/new", renderNewNote);
router.post("/", createNote);
router.get("/:id", findNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;