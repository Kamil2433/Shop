import React from "react";
import { Modal, Button, Form, ModalHeader, ModalBody } from "react-bootstrap";
import Col from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRef } from "react";
import { useShop } from "../Context/Shoppingcontext";
import CloseButton from "react-bootstrap/CloseButton";
import { useEffect } from "react";
import Item from "./Item";
import { useLogin } from "../Context/LoginContext";

export default function Addlistmodal({ onHide }) {
  const { relist, addlist, setalert, setmessage} = useShop();
  const {setmessagel}=useLogin()

  const handlesubmit = (e) => {
    e.preventDefault();
    addlist(); onHide()
    setalert(true)
    setmessage("your order is placed")

  };

  return (
    <>
      {/* <Modal.Header>Create New Note < closeButton></closeButton></Modal.Header> */}
      <ModalHeader>
        <Modal.Title>Checkout</Modal.Title>
        {/* <button className="btn-close">  */}
        {/* <button type="button" class="btn-close" aria-label="Close"></button> */}
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true" onClick={() => onHide()}>
            &times;
          </span>
        </button>
      </ModalHeader>

      <ModalBody>
        <Form onSubmit={handlesubmit}>
          {relist.length ? (
            relist.map((item, idx) => {
              return (
                <div key={idx} className="col-12 col-md-4">
                  {item.name} {} {item.count}
                </div>
              );
            })
          ) : (
            <div>No Items Add to Cart</div>
          )}
          <Button type="submit" variant="primary" className="m-2">
            Buy
          </Button>{" "}
        </Form>
      </ModalBody>
    </>
  );
}
