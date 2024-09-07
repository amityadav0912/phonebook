import React, { useEffect, useState } from 'react';
import AddContact from './AddContact';
import { v4 as uuid } from "uuid";
import './App.css';
import ContactList from './ContactList';
import Header from './Header';

function App() {

  // let contacts = [
  //   { 
  //     id:"1",
  //     name:"Amit",
  //     email:"Amityadav@gmail.com"
  //   },
  //   {
  //     id:"2",
  //     name:"Ankita",
  //     email:"Ankitayadav@gmail.com"
  //   }
  // ];

  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

 
  const addContactHandler = (contact) =>{
    setContacts([...contacts, {id:uuid(), ...contact}]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id!=id;
    })

    setContacts(newContactList);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  
  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler ={addContactHandler}/>
      <ContactList contacts={contacts} getContactId = {removeContactHandler}/>
    </div>
  );
}

export default App;
