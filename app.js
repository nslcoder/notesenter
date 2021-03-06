const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");

const notesRoutes = require("./routes/routes");
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

app.use("/notes", notesRoutes);

// Starting the server and listening on a port
app.listen(port, () => {
    console.log(`The server is listening on port ${port}.`);
});