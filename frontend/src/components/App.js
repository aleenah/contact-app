import React, {useState, useEffect, useInsertionEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';
import { ContactsCrudContextProvider } from '../context/ContactsCrudContext';

function App() {

  return (
    <div className="ui container">
      <Router>
        <Header />
        <ContactsCrudContextProvider>
        <Routes>
          <Route 
            path="/" 
            exact 
            element={<ContactList/>} /> 

          <Route 
            path="/add" 
            exact 
            element={<AddContact />} />

          <Route 
            path="/edit" 
            exact 
            element={<EditContact />} />

          <Route path="/contact/:id" element={<ContactDetail/>}/> 
        </Routes>
        </ContactsCrudContextProvider>
      </Router> 
    </div>
  );
}

export default App;
