/*const noteRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

noteRoutes.get("/getNote", async (req, res) => {
  const { _id } = req.user;
  const newNote = new dataModel({
    _id: _id,
  });
  let note = await dataModel.findById(_id);
  if (!note) note = await newNote.save();
  console.log(note.notes);
  res.json(note.notes);
});

noteRoutes.post("/postNote", async (req, res) => {
  const { _id } = req.user;
  const note = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { notes: note } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

noteRoutes.patch("/updateNote/:id", async (req, res) => {
  const { id } = req.params;
  const { newText } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "notes.id": id },
      {
        $set: {
          "notes.$.noteText": newText,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

noteRoutes.delete("/deleteNote/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { notes: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = noteRoutes;
*/
/*const express = require("express");
const noteRoutes = express.Router();
const dataModel = require("../Models/DataModel");

// 📌 GET NOTES (Retrieve all notes for a user)
noteRoutes.get("/getNote", async (req, res) => {
  try {
    const { _id } = req.user;
    
    // Find user document
    let userNotes = await dataModel.findById(_id);
    
    // If user does not exist, create an empty entry
    if (!userNotes) {
      userNotes = await new dataModel({ _id, notes: [] }).save();
    }

    console.log("Fetched Notes:", userNotes.notes);
    res.json(userNotes.notes);
  } catch (error) {
    console.error("GET Notes Error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// 📌 POST NOTE (Save a new note)
noteRoutes.post("/postNote", async (req, res) => {
  try {
    const { _id } = req.user;
    const note = { id: new Date().getTime().toString(), ...req.body }; // Ensure unique ID

    // Update user notes array with the new note
    const updatedUser = await dataModel.findByIdAndUpdate(
      _id,
      { $push: { notes: note } },
      { new: true, upsert: true }
    );

    console.log("New Note Added:", note);
    res.json({ success: "Posted Successfully", updatedNotes: updatedUser.notes });
  } catch (err) {
    console.error("POST Note Error:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// 📌 UPDATE NOTE (Modify an existing note)
noteRoutes.patch("/updateNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newText } = req.body;

    console.log("Received Update Request for ID:", id);

    // Find and update the specific note
    const result = await dataModel.findOneAndUpdate(
      { "notes.id": id }, 
      { $set: { "notes.$.noteText": newText } }, 
      { new: true }
    );

    if (!result) {
      console.error("Note not found in database.");
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Updated Note Successfully:", result);
    res.json({ success: "Updated successfully", updatedNote: result.notes });
  } catch (error) {
    console.error("UPDATE Note Error:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// 📌 DELETE NOTE (Remove a note)
noteRoutes.delete("/deleteNote/:id", async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    // Remove note with given ID
    const updatedUser = await dataModel.findByIdAndUpdate(
      _id,
      { $pull: { notes: { id: id } } },
      { new: true }
    );

    console.log("Deleted Note ID:", id);
    res.json({ success: "Deleted successfully", updatedNotes: updatedUser.notes });
  } catch (error) {
    console.error("DELETE Note Error:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = noteRoutes;
*/
const express = require("express");
const noteRoutes = express.Router();
const dataModel = require("../Models/DataModel");

// 📌 GET NOTES (Retrieve all notes for a user)
noteRoutes.get("/getNote", async (req, res) => {
  try {
    const { _id } = req.user;

    // Find user document
    let userNotes = await dataModel.findById(_id);

    // If user does not exist, create an empty entry
    if (!userNotes) {
      userNotes = await new dataModel({ _id, notes: [] }).save();
    }

    console.log("Fetched Notes:", userNotes.notes);
    res.json(userNotes.notes);
  } catch (error) {
    console.error("GET Notes Error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// 📌 POST NOTE (Save a new note)
noteRoutes.post("/postNote", async (req, res) => {
  try {
    const { _id } = req.user;
    const note = { id: new Date().getTime().toString(), ...req.body }; // Ensure unique ID

    // Update user notes array with the new note
    const updatedUser = await dataModel.findByIdAndUpdate(
      _id,
      { $push: { notes: note } },
      { new: true, upsert: true }
    );

    console.log("New Note Added:", note);
    res.json({ success: "Posted Successfully", updatedNotes: updatedUser.notes });
  } catch (err) {
    console.error("POST Note Error:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// 📌 UPDATE NOTE (Modify an existing note)
noteRoutes.patch("/updateNote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newText } = req.body;

    console.log("Received Update Request for ID:", id);

    // Find and update the specific note
    const result = await dataModel.findOneAndUpdate(
      { "notes.id": id },
      { $set: { "notes.$.noteText": newText } },
      { new: true }
    );

    if (!result) {
      console.error("Note not found in database.");
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Updated Note Successfully:", result);
    res.json({ success: "Updated successfully", updatedNote: result.notes });
  } catch (error) {
    console.error("UPDATE Note Error:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// 📌 DELETE NOTE (Remove a note)
noteRoutes.delete("/deleteNote/:id", async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    // Remove note with given ID
    const updatedUser = await dataModel.findByIdAndUpdate(
      _id,
      { $pull: { notes: { id: id } } },
      { new: true }
    );

    console.log("Deleted Note ID:", id);
    res.json({ success: "Deleted successfully", updatedNotes: updatedUser.notes });
  } catch (error) {
    console.error("DELETE Note Error:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = noteRoutes;