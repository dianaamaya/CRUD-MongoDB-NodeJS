const notesCtrl = {};

// Models
const Note = require("../models/Note");

/**
 * render the notes form
 */
notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

/**
 * create a new note
 */
notesCtrl.createNewNote = async (req, res) => {

  //get form parameters
  const { title, description } = req.body;

  //set possible errors
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description
    });
  } else {
    //if there are not errors, create the new 
    //note associated with the logged in user
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    //save note in database
    await newNote.save();
    //send message
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/notes");
  }
};

/**
 * get all notes
 */
notesCtrl.renderNotes = async (req, res) => {
  //get all notes from database descendingly
  const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
  //render notes page
  res.render("notes/all-notes", { notes });
};

/**
 * get form to edit the note
 */
notesCtrl.renderEditForm = async (req, res) => {

  // get from database the id of the note to be edited
  const note = await Note.findById(req.params.id);
  // if the note was created by other user, send error and render notes page
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  //in other case, get the form with the current note
  res.render("notes/edit-note", { note });
};

/**
 * update data of a note
 */
notesCtrl.updateNote = async (req, res) => {
  //get parameters
  const { title, description } = req.body;
  //get the note id and update it with the parameters
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  //send message and render notes page
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

/**
 * delete a note
 */
notesCtrl.deleteNote = async (req, res) => {
  //get the parameter (note id to be deleted)
  const note = await Note.findById(req.params.id);
  // if the note was created by other user send error
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  // in other case delete from database the note given
  await Note.findByIdAndDelete(req.params.id);
  //send a successfull message 
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;