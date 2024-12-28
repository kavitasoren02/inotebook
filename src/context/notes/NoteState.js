import  { useState } from "react";
import NoteContext from "./noteContext";
import { getToken, removeToken } from "../../components/Notes";
import { useNavigate } from "react-router-dom";

//  const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYzIwNWJjMjk3ZjczMGI3NjVkM2UwIn0sImlhdCI6MTcyNzc5OTM4N30.dxpSJNYpRw-3zFDdGn5pGXofdvBL3JHbRnT9qpvMLiI";


const NoteState=(props)=>{
const host="http://localhost:5000";

  const noteInitial=[]
  const [notes, setNotes] = useState(noteInitial);

  const getAllNote=async()=>{

    //TODO:API CALL
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        "Content-type": "application/json",
        // "auth-token": `${TOKEN}`
        "auth-token":localStorage.getItem("token")
         }
    })
    const json=await response.json()
    return json
  }

      //Add a note

     
      const addNote=async(title,description,tag)=>{
        //TODO:API CALL
        const response=await fetch(`${host}/api/notes/addnote`,{
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            //  "auth-token":`${TOKEN}`
            "auth-token":localStorage.getItem("token")
          },
          body:JSON.stringify({title,description,tag})
        })
        const json= await response.json();
        // console.log(json);
        setNotes((prevNotes) => [...prevNotes, json]);
      
        //     const note=
        //   {
        //     "_id": "66f6bqed71fe97a3b62c15cbf",
        //     "user": "66f6be8f1fe97a3b62c15cb5",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2024-09-27T14:19:03.647Z",
        //     "__v": 0
        //   }
        // setNotes(notes.concat(note))
}
    //delete notes
    const deleteNote=async (id)=>{
      //TODO API CALL

      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          "Content-type":"application/json",
          // "auth-token":`${TOKEN}`
          "auth-token":getToken()

        },
      
      })
      // const json=await  response.json();
      // console.log(json);
      // console.log("Deleting the note with id"+id);
     const newNotes= notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    //edit notes 
    const editNote=async(id,title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method:'PUT',
        headers:{
          "Content-type":"application/json",
          // "auth-token":`${TOKEN}`
          "auth-token":localStorage.getItem("token")

        },
        body: JSON.stringify({ title, description, tag }) 
      })
      const json= response.json();
      console.log(json);
      let newNotes=JSON.parse(JSON.stringify(notes))

      
      //logic to edit in client
      for(let index=0;index<newNotes.length;index++)
      {
        const element=newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
        break;
        }
      }
      setNotes(newNotes);
    }
  
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNote, setNotes}}>
               {props.children}
        </NoteContext.Provider>
    )
  }
export default NoteState;
// const NoteState=(props)=>{
//     const s1={
//         "name":"kavita",
//         "age":23
//     }
//     const[state ,setState]=useState(s1);
//     const update=()=>{
//         setTimeout(()=>{
//             setState({
//                 "name":"sheetal",
//                 "age":24

//             })
//         },1000)
//     }
//     return (
//         <NoteContext.Provider value={{state,update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }


