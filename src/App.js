import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./styles.css";

export default function App() {
  document.body.style = "background-color: black";

  const [users, setUsers] = React.useState([]);

  const submitHandler = (user) => {
    user.id = Math.random();
    setUsers((prevUsers) => [...prevUsers, user]);
  }

  return (
    <Container className="p-3">
      <Card className="m-5">
        <Card.Body>
          <UserForm onSubmit={submitHandler} />
        </Card.Body>
      </Card>
      <Card className="m-5" style={{ visibility: !users.length && "hidden" }}>
        <Card.Body>
          <UserList users={users} />
        </Card.Body>
      </Card>
    </Container>
  );
}
