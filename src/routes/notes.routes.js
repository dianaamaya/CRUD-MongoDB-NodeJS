const express = require("express");
const router = express.Router();

// Controllers
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// to get notes form
// check if it is authenticated and call the controller
router.get("/notes/add", isAuthenticated, renderNoteForm);

// to create a new note
// check if it is authenticated and call the controller
router.post("/notes/new-note", isAuthenticated, createNewNote);

// to get all notes
// check if it is authenticated and call the controller
router.get("/notes", isAuthenticated, renderNotes);

// to edit notes
// check if it is authenticated and call the controller
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

// to update notes
// check if it is authenticated and call the controller
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// to delete notes
// check if it is authenticated and call the controller
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;