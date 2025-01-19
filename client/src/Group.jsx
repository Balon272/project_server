import { useState } from "react"
import ChoiceForm from "./ChoiceForm"; // Adjust the path as needed
function Group({ groups, onDeleteGroup, onUpdateGroup  }) {
    const [updateItem, setUpdateItem] = useState()
    const [selectedOption, setSelectedOption] = useState("");
     const handleSelection = (option) => {
        setSelectedOption(option); // Update the selected option
        console.log("Selected Option in Group:", option); // You can handle further logic here
 };
     return (
        
         <div className='form-container'>
             {groups.length > 0 ? (
                 groups.map((group, i) => (
                     <div className="group" key={i}>
                         <p>ID: {group._id.toString()}</p> {/* Render ObjectId as a string */}
                         <p>Name: {group.name}</p>
                         <p>SubGroups: {group.subgroups.join(", ")}</p>
                         <p>People: {group.people.join(", ")}</p>
                         <button className="delete-button" onClick={() => onDeleteGroup(group._id)}>Delete</button>
                         <br/>
                         <button onClick={() => onUpdateGroup(group._id, updateItem, selectedOption)}>Update Item</button>
                         <input 
                         type="text"
                         onChange={(e) => setUpdateItem(e.target.value)}    
                          placeholder="Name"
                           />
                        <ChoiceForm onSelectionChange={handleSelection} />
                     </div>
                 ))
             ) : (
                 <p>No data available.</p> // Handle case when data is empty
             )}
         </div>
     );
 }


export default Group