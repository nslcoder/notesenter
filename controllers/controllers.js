const marked = require("marked");
/* const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom"); */
const Note = require("../models/Note");

/* const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window); */

// Rendering the create-a-note page
const renderNewNote = async (req, res) => {
    res.render("new");
};

// Creating a note
const createNote =  async (req, res) => {
    try {
        await Note.create({ title: req.body.title, description: req.body.description })
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
};

// Finding a note and rendering it in the edit page
const findNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.render("edit", { note: note })
    } catch(e) {
        console.log(e);
    }
};

// Saving the edited note
const updateNote = async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
};

// Deleting a note
const deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
};

module.exports = {
    renderNewNote,
    createNote,
    findNote,
    updateNote,
    deleteNote
};
