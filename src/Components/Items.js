import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { useShop } from "../Context/Shoppingcontext";
import Addlistmodal from "./Addlistmodal";
import { Modal } from "react-bootstrap";
import Item from "./Item";
import Alertcomponent from "./Alertcomponent";
import "./style.css";

export default function Items({ given }) {
  const {  variant,count,setitems,Items,message,Showalert} = useShop();
  const [show, setmodal] = useState(false);
  const temp=Array.from(given);

  const closethemodal = () => {
    setmodal(false);
  };

  useEffect(() => {
    
  }, [Items]);

  const iconStyles = {
    fontSize: '2em',
    color: '#1E40AF'
  };

  return (
    <>
   

    <div className="mt-5 m-5" style={{marginTop:"20%",paddingTop:"80px"}}>
    <div className="cart-icon">
    <i className="fas fa-shopping-cart fa-2x text-blue-500" style={iconStyles}></i>
      {count > 0 && <b> {count}</b>} {   }
      <Button className="primary " onClick={()=>setmodal(true)} >
           Checkout
      </Button>

    </div>
      </div>

      <Modal show={show} onHide={closethemodal}>
        <Addlistmodal onHide={closethemodal} />
      </Modal>

      <div className="container">
        <div className="row w-100">
          {temp.length ? 
            temp.map((item, idx) => {
              return <div key={idx} className="col-12 col-md-4">
                <Item  name={item.name}  id={item.id}   />
              </div>
            }) :
            <div>No Items for sale</div>}
        </div>
      </div>

    </>
  );
}