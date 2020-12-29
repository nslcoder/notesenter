const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

const Note = require("./models/Note");

const app = express();

const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODB_URL;

app.use(methodOverride("_method")); // Overriding the delete method 
app.use(express.urlencoded({ extended: true }));

// Setting the view engine
app.set("view engine", "ejs");

// Connecting to MongoDB
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log("Database connected.");
})
.catch(err => {
    console.log(err);
});

// Serving the homepage with all the notes
app.get("/", async (req, res) => {
    const notes = await Note.find({}).sort({ createdAt: "desc" });
    res.render("index", { notes: notes });
});

// Serving the create-a-note page
app.get("/notes/new", (req, res) => {
    res.render("new");
})

// Creating a note
app.post("/notes", async (req, res) => {
    try {
        await Note.create({ title: req.body.title, description: req.body.description })
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
});

// Editing a note
app.get("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.render("edit", { note: note })
    } catch(e) {
        console.log(e);
    }
});

// Saving the edited note or updating the note
app.put("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
})

// Deleting a note
app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id);
        res.redirect("/");
    } catch(e) {
        console.log(e);
    }
})

// Starting the server and listening on a port
app.listen(port, () => {
    console.log(`The server is listening on port ${port}.`);
});