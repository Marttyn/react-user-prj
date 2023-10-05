import React from "react";
import Container from "react-bootstrap/Container";

const UserList = ({ users }) => {
    if (!users.length) {
        return null;
    }
    
    return (
        <>
        {users.map((user) => (
            <Container className="border m-2" key={user.id}>{user.username} ({user.age} years old)</Container>
        ))}
        </>
    );
}

export default UserList;