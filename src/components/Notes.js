import React, { useContext,useState, useEffect,useRef, useLayoutEffect } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

export const getToken = () => localStorage.getItem('token')
export const removeToken = () => localStorage.removeItem('token')

const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate=useNavigate();
  const { notes, getAllNote,editNote, setNotes} = context;

  const GetAllNotes = async() => {
    const data = await getAllNote()
    if(data.status === 401){
      removeToken()
      navigate('/login')
      return
    }
    setNotes(data)
  }
  useLayoutEffect(() => {
    const token = getToken()
    if(token && token !== 'undefined'){
    // console.log('Token:', token);  Check if the token exists
    GetAllNotes()
   }else{
    removeToken()
    navigate('/login');
   }
    // eslint-disable-next-line
  }, []);

  const refclose=useRef(null);
  const ref=useRef(null)
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
 
  };
  const handleClick=(e)=>{
    console.log("Updating the note",note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
     refclose.current.click();
      console.log("Updating the note",note);
      props.showAlert("Updated Successfully","success")
      

  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})
  }
 
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Launch demo modal
      </button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text"className="form-control"id="etitle" name="etitle" value={note.etitle}aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text"className="form-control"id="edescription" name="edescription"value={note.edescription}onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text"className="form-control"id="etag" name="etag"value={note.etag}onChange={onChange}/>
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refclose} type="button" className="btn btn-primary"onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && 'No notes  to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
