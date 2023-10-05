import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import UserFormModal from "./UserFormModal";

const UserForm = ({ onSubmit }) => {
  const defaultUserFormValues = {
    username: {
      value: "",
      valid: false,
      touched: false,
    },
    age: {
      value: "",
      valid: false,
      touched: false,
    },
  };
  const [userForm, setUserForm] = React.useState(defaultUserFormValues);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState({});

  const changeHandler = (event) => {
    let isValid = false;
    if (event.target.id === "username") {
      isValid = event.target.value.length > 0;
    }
    if (event.target.id === "age") {
      isValid = event.target.value > 0;
    }

    setUserForm({
      ...userForm,
      [event.target.id]: {
        value: event.target.value,
        valid: isValid,
        touched: true,
      },
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const { username, age } = userForm;
    const isUsernameValid = username.valid;
    const isAgeValid = age.valid;

    if (!isUsernameValid && !isAgeValid) {
      showErrorModal(
        "Invalid input",
        "Please enter a valid username and age (Non-empty values)."
      );
    } else if (!isUsernameValid) {
      showErrorModal("Invalid username", "Please enter a valid username.");
    } else if (!isAgeValid) {
      showErrorModal("Invalid age", "Please enter a valid age (> 0).");
    } else {
      setUserForm(defaultUserFormValues);
      onSubmit({
        username: username.value,
        age: age.value,
      });
    }
  };

  const showErrorModal = (errorTitle, errorMessage) => {
    setError({
      title: errorTitle,
      message: errorMessage,
    });
    setShowModal(true);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={userForm.username.value}
            onChange={changeHandler}
            isInvalid={!userForm.username.valid && userForm.username.touched}
            isValid={userForm.username.valid && userForm.username.touched}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age (Years)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={userForm.age.value}
            onChange={changeHandler}
            isInvalid={!userForm.age.valid && userForm.age.touched}
            isValid={userForm.age.valid && userForm.age.touched}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
      <UserFormModal
        show={showModal}
        setShow={setShowModal}
        title={error.title}
        message={error.message}
      />
    </>
  );
};

export default UserForm;
