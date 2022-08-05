import {createContext, useContext, useState} from 'react';
import api from "../api/contacts";
import { v4 as uuid } from 'uuid';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
    const [searchTerm, setSearchTerm] = useState([])
    const [contacts, setContacts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContacts(response.data);
    } 
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
       const newContactList = contacts.filter((contact) => {
         return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase())
       });
       setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  } 

const value =  {
    contacts,
    searchResults,
    searchTerm,
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler,
}

    return (
        <contactsCrudContext.Provider value={ value }>
            {children}
        </contactsCrudContext.Provider>
    )
}

export function useContactsCrud() {
    return useContext(contactsCrudContext)
}