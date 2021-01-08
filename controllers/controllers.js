const Note = require("../models/Note");

// Rendering the create-a-note page
const renderNewNote = async (req, res) => {
    res.render("new");
};

// Creating a note
const createNote =  async (req, res) => {
    try { 
        const noteCount = await Note.find({});
        if(noteCount.length > 3) return res.send("The database has reached its limit.");
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
        // Pre and post save() hooks aren't executed on update(), findOneAndUpdate(), etc, so the workaround is to use findById() and save() separately
        const note = await Note.findById(req.params.id);

        // Modifying the note properties 
        note.title = req.body.title;
        note.description = req.body.description;
        
        // Saving the updated note
        await note.save();
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
