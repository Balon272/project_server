import React, { useState } from "react";

function Form({ onAddPerson, onAddGroup, type }) {
    const [name, setName] = useState("");
    const [groupName, setgroupName] = useState("");
    const [groupSub, setGroupSub] = useState("");
    const [groupPeople, setgroupPeople] = useState("");

    const handleSubmit = () => {
        if(type === "Person"){
        const formData = { name };
        onAddPerson(formData);
        // Clear the form after submission
        setName("");
    }
    else if (type ==="Group"){
        const formData = {groupName, groupSub, groupPeople}
        onAddGroup(formData)
        setName("");
    }
    };

    return (
        <form>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <button type="button" onClick={handleSubmit}>
                {type === "Person" ? "Add Person" : "Add Group"}
            </button>
        </form>
    );
}

export default Form;
