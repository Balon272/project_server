import React, { useState, useEffect } from "react";
import People from './People.jsx';
import Group from './Group.jsx';
import Form from './Form.jsx';

function App() {
    const [people, setPeople] = useState([]); // State to manage the list of people
    const [groups, setGroups] = useState([]); // State to manage the list of people

    // Function to fetch people from the database
    //TO-DO FIX DELETE GROUP DELETING ALL GROUPS
    const fetchPeople = async () => {
        try {
            const response = await fetch("http://localhost:1107/handler/people/get");
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchGroups = async () => {
        try {
            const response = await fetch("http://localhost:1107/handler/group/get");
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Fetch the people list when the component mounts
    useEffect(() => {
        fetchPeople();
    }, []);

    useEffect(() => {
        fetchGroups();
    }, []);

    const deletePerson = async (personId) => {
        try {
            const personObject = {_id: personId}
            await fetch(`http://localhost:1107/handler/people/delete/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            
                body: JSON.stringify(personObject)
            });
            fetchPeople(); // Refresh the list after deleting a person
        } catch (error) {
            console.error("Error deleting person:", error);
        }
    };

    // Function to add a new person
    const addPerson = async (newPerson) => {
        try {
            await fetch("http://localhost:1107/handler/people/post", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPerson),
            });
            fetchPeople(); // Refresh the list after adding a person
        } catch (error) {
            console.error("Error adding person:", error);
        }
    };

    const updatePerson = async (_id, name) => {
        try {
            
            const personObject = {_id: _id, updateFields: { name: name } }
            console.log(JSON.stringify(personObject))
            await fetch("http://localhost:1107/handler/people/patch", {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(personObject),
            });
            fetchPeople(); // Refresh the list after adding a person
        } catch (error) {
            console.error("Error updating person:", error);
        }
    };

    const deleteGroup = async (groupId) => {
        try {
            const groupObject = {_id: groupId}
            await fetch(`http://localhost:1107/handler/group/delete/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            
                body: JSON.stringify(groupObject)
            });
            fetchGroups(); // Refresh the list after deleting a person
        } catch (error) {
            console.error("Error deleting person:", error);
        }
    };

    // Function to add a new person
    const addGroup = async (newGroup) => {
        try {
            await fetch("http://localhost:1107/handler/group/post", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGroup),
            });
            fetchGroups(); // Refresh the list after adding a person
        } catch (error) {
            console.error("Error adding person:", error);
        }
    };

    const updateGroup = async (_id, name) => {
        try {
            
            const groupObject = {_id: _id, updateFields: { name: name } }
            console.log(JSON.stringify(groupObject))
            await fetch("http://localhost:1107/handler/group/patch", {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(groupObject),
            });
            fetchGroups(); // Refresh the list after adding a person
        } catch (error) {
            console.error("Error updating person:", error);
        }
    };

    return (
        <div>
            <h1>Add a New Person</h1>
            <Form onAddPerson={addPerson} type="Group" />
            <h2>People List</h2>
            <People people={people} onDeletePerson={deletePerson} onUpdatePerson={updatePerson}  />
 


            <h2>Add a New Group</h2>
            <Form onAddGroup={addGroup} type="Group"/>
            <h2>Group List</h2>
            <Group groups={groups} onDeleteGroup={deleteGroup} onUpdateGroup={updateGroup}  />

        </div>
    );
}

export default App;
