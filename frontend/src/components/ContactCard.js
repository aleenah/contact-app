import React from "react";
import {Link} from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import avatar from "../images/avatar.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  
  const {removeContactHandler} = useContactsCrud;

  const deleteContact = (id) => {
    removeContactHandler(id);
  }
  return (
    <div className="item">
      <img className="ui avatar image" src={avatar} alt="avatar" />
      <div className="content">
        <Link to={{pathname:"/contact/${id}", state: {contact: props.contact}}}>
        <div className="header">{name}</div>
        <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon right floated"
        style={{ color: "red", marginTop: "7px", }}
        onClick={() => deleteContact(id)}
      ></i>

      <Link to={"/contacts${id}"} 
        state =  {{contact: props.contact}}>
        <i className="edit alternate outline icon right floated"
        style={{ color: "purple", marginTop: "7px", }}
       ></i>
       </Link>
    </div>
  );
};

export default ContactCard;