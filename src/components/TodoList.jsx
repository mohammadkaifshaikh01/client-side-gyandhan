import React, { useState } from 'react';
import axios from 'axios';


const TodoList = () => {
   const [title ,setTitle] = useState("");
   const [description ,setDescription] = useState("");
   const [status ,setStatus] = useState("Not Started"); 
   const [priority,setPriority] = useState("Low");

   const handleForm = async (e) =>{
      e.preventDefault();
      const create = {title,description,status,priority};
      console.log(create);

      try{

         const response = await axios.post("https://gyandhan-assignment.onrender.com/create", create )
         console.log(response.data);
         alert("Todo Added");
      }catch(error){
            console.log(error)
      }
   }

   return (
      <div className="container">
         <h2>Todo List</h2>
         <form onSubmit={handleForm}>
            <input type="text" value={title} placeholder='Enter Your Title' onChange={(e)=>setTitle(e.target.value)} />
            <textarea value={description} placeholder='Enter Your Description' onChange={(e)=>setDescription(e.target.value)} />
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
               <option value="Not Started">Not Started</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
            </select>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
}

export default TodoList;