const mongoose = require("mongoose");
/* const marked = require("marked");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window); */

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
/*     sanitizedHTML: {
        type: String,
        required: true
    } */
}, 
{
    timestamps: true
});

/* NoteSchema.pre("validate", function(next) {
    if(this.description) {
        this.sanitizedHTML = DOMPurify.sanitize(marked(this.description));
    }

    next()
}) */

module.exports = mongoose.model("Note", NoteSchema);