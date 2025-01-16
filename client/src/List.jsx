import React from "react";

function UserList({ users, deleteUser }) {
    return (
        <ol>
            {users.map((userData, index) =>   
                <li key={index}
                    className={index >= 20 ? 'red-background' : 'blue-background'}>
                    <span className="User">
                        Name: {userData.firstName}    
                        Last Name: {userData.lastName}    
                        Email: {userData.email}    
                        Age: {userData.age}   
                        Number: {index + 1} 
                    </span>
                    <button onClick={() => deleteUser(index + 1)}>Delete</button>
                </li>
            )}
        </ol>
    );
}

export default UserList;
