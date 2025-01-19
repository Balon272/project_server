import React, { useState } from "react";

function Form({ onAddPerson, onAddGroup, type }) {
    const [name, setName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupSub, setGroupSub] = useState("");
    const [groupPeople, setGroupPeople] = useState("");

    const handleSubmit = () => {
        if(type === "Person"){
        const formData = { name };
        console.log(formData)
        onAddPerson(formData);
        // Clear the form after submission
        setName("");
    }
    else if (type ==="Group"){
        const groupsArray = separateID(groupSub)
        const peopleArray = separateID(groupPeople)
        const formData = {groupName, groupsArray, peopleArray}
        onAddGroup(formData)
        setGroupName("");
        setGroupSub("");
        setGroupPeople("");
    }
    };

    return (
        <form>
            {type === "Person" ? 
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Person Name"
            />
            : ""}
            {type === "Group" ? 
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
            />
            : ""}
            {type === "Group" ? 
                    <input
                    type="text"
                    value={groupSub}
                    onChange={(e) => setGroupSub(e.target.value)}
                    placeholder="SubGroups"
                />     
        : ""}
            {type === "Group" ? 
                    <input
                    type="text"
                    value={groupPeople}
                    onChange={(e) => setGroupPeople(e.target.value)}
                    placeholder="People"
                />     
        : ""}
        <button type="button" onClick={handleSubmit}>
                {type === "Person" ? "Add Person" : "Add Group"}
                
            </button>
        </form>
    );
}


function separateID(input) {
    if (!input) {
        return []; // Return an empty array if the input is null, undefined, or empty
    }

    const objectIdRegex = /^[a-f\d]{24}$/i; // Regex to match MongoDB ObjectId (24 hex characters)

    return input
        .split(",") // Split by commas
        .map(id => id.trim()) // Trim whitespace
        .filter(id => objectIdRegex.test(id)); // Keep only valid ObjectId strings
}

export default Form;
