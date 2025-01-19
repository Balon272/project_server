import React, { useState } from "react";

function People({ people, onDeletePerson, onUpdatePerson  }) {
    const [updateName, setUpdateName] = useState()
    return (
        
        <div className='form-container'>
            {people.length > 0 ? (
                people.map((person, i) => (
                    <div className="person" key={i}>
                        <p>ID: {person._id.toString()}</p> {/* Render ObjectId as a string */}
                        <p>Name: {person.name}</p>


                        <input 
                        type="text"
                        onChange={(e) => setUpdateName(e.target.value)}    
                         placeholder="Name"
                          />
                        <button onClick={() => onUpdatePerson(person._id, updateName )}>Update</button>
                        <br/>
                        <button onClick={() => onDeletePerson(person._id)} className="delete-button">Delete</button>
                    </div>
                ))
            ) : (
                <p>No data available.</p> // Handle case when data is empty
            )}
        </div>
    );
}

export default People;
