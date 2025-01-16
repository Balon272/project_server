import { useState } from "react"

function Group({ groups, onDeleteGroup, onUpdateGroup  }) {
 const [updateName, setUpdateName] = useState()
     return (
         <div className='form-container'>
             {groups.length > 0 ? (
                 groups.map((group, i) => (
                     <div className="group" key={i}>
                         <p>ID: {group._id.toString()}</p> {/* Render ObjectId as a string */}
                         <p>Name: {group.name}</p>
                         <button onClick={() => onDeleteGroup(group._id)}>Delete</button>
                         <button onClick={() => onUpdateGroup(group._id, updateName )}>Update</button>
                         <input 
                         type="text"
                         onChange={(e) => setUpdateName(e.target.value)}    
                          placeholder="Name"
                           />
 
                     </div>
                 ))
             ) : (
                 <p>No data available.</p> // Handle case when data is empty
             )}
         </div>
     );
 }


export default Group