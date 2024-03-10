import React from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useLogin } from "../Context/LoginContext";
import { useShop } from "../Context/Shoppingcontext";
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBIcon,
  CDBBtn,
  CDBLink,
  CDBContainer,
} from "cdbreact";

export default function Login() {
  const id = useRef();
  const name = useRef();
  const password = useRef();

  const {
    setid,
    reggisterauser,
    loginauser,
    setname,
    auth,
    success,
    setsucess,
  } = useLogin();
  const { setalert } = useShop();

  const [loginview, setview] = useState(true);

  const handlesubmit = (e) => {
    e.preventDefault();

    setid(id.current.value);
    const res = loginauser(id.current.value, password.current.value);
    setalert(true);
  };

  const handleregisterationsubmit = (e) => {
    e.preventDefault();

    reggisterauser(
      id.current.value,
      password.current.value,
      name.current.value
    );
    setalert(true);

    console.log("her is the id");
    console.log(id.current.value);
    if (success === true) {
      setview(true);
    }

    // if(success){

    //  const set=await  setmessage("Registeration successful,Please Login")
    //  const setsu=await setsucess(false)
    //   await setalert(true)
    //   // await setmessage(null)
    // }else{
    //  const set=await setmessage("Registeration unsuccessful, ID Unavailable try with different ID");
    //   const va=await  setvariant('danger')
    //   await  setalert(true)
    //   //  await setmessage(null);

    // }
  };

  return loginview ? (
    <div style={{ margin: 200 }}>
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID"
            className="loginid"
            ref={id}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="loginpass"
            ref={password}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>{" "}
        <Button
          onClick={() => 
            setview(false)
          }
          variant="secondary"
        >
          Click here to Register
        </Button>{" "}
      </Form>
    </div>
  ) : (
    // registeration
    <div style={{ margin: 200 }}>
      <Form onSubmit={handleregisterationsubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="name" ref={name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            ID
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="id"
              className="loginid"
              ref={id}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Password"
              className="loginpass"
              ref={password}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>{" "}
        <Button 
          onClick={() => {
            setview(true);
          }}
          variant="secondary"
        >
          Click here to Login
        </Button>{" "}
      </Form>
    </div>
  );
}
