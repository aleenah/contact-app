import React, {useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const {contacts, retrieveContacts, searchTerm, searchResults, searchHandler} = useContactsCrud();
  console.log(props);

  useEffect(() => {
    retrieveContacts();
  },[])

  const renderContactList = (searchTerm.length < 1 ? contacts: searchResults).map((contact) => {
    return (
      <ContactCard
        contact={contact}
        key={contact.id}
      />
    );
  });

  const onUserSearch = (e) => {
    searchHandler(e.value.target);
  }

  return (
  <div class="main">
    <br></br>
    <h2>Contacts
      <Link to="/add">
        <button className="ui right floated pink button">Create Contact</button>
      </Link>
    </h2>
    <div className="ui search">
      <div className="ui icon input">
        <input type="text" placeholder="Search Contacts" className="prompt" value={searchTerm} onChange={(e) => onUserSearch(e)} />
        <i className="search icon"></i>
      </div>
    </div>
    <div className="ui celled list">{renderContactList}</div>
   </div>
  );
};

export default ContactList;