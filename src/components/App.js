import React, { useEffect, useState } from 'react';
import AddContact from './AddContact';
import { v4 as uuid } from "uuid";
import './App.css';
import ContactList from './ContactList';
import Header from './Header';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'

function App() {
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
      <div style={{ marginTop: "100px" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  contacts={contacts}
                  removeContactHandler={removeContactHandler}
                />
              }
            />
            <Route
              path="/add"
              element={
                <AddContact
                  addContactHandler={addContactHandler}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
export default App;
