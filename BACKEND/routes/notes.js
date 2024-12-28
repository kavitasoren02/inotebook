const express = require("express");
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");


const JWT_SECRET = "kavitaisagoodgirl";

//ROUTE1: Get all the notes : GET /api/auth/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try{
  const notes = await Note.find({ user: req.user.id });
  // console.log(notes);
  res.json(notes);
  
  }catch(error){
    // console.error(error.message);
    res.status(500).send("Internal server Error");
  }
});

//ROUTE2: Add a new note using: POST /api/auth/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    // Validate and sanitize input
    body("title", "Title is required").isLength({ min: 3 }),
    body("description", "Please enter a valid email").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
    const { title, description, tag } = req.body;
    //  if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      // console.error(error.message);
      const errors = validationResult(req);
      return res.status(500).json({ errors: errors.array() });

      // res.status(500).send("Internal server Error");
    }
  }
);


//ROUTE 3: UPDATE an exsisting notes using:PuT "/api/anotes/updatenote"

router.put(
  '/updatenotes/:id',
  fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    
    //find the note to be updated and updated

    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Note found")}
    console.log(note.user) 
    console.log(req.user.id)
    if(note.user.toString() !==req.user.id)
    {
      return res.status(401).send("Not allowed")
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
  })
  
  //ROUTE 4: DELETE an exsisting notes using:DELETE "/api/notes/deletenote
router.delete(
  '/deletenote/:id',
  fetchuser,async(req,res)=>{
  
    const { title, description, tag } = req.body;
    
    //find the note to be delete
    try{
    let note=await Note.findById(req.params.id);
    console.log(note);
    
    if(!note){return res.status(404).send("Note  not found")}
    
    //allow deletion only if user own this note
    if(note.user.toString() !==req.user.id)
    {
      return res.status(401).send("Not allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"SUCCESS":"Note has been deleted",note:note})
  }
  catch(error){
    res.status(500).send("Internal server Error");
  }
  })
module.exports = router;
