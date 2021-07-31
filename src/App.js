import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContactForm from './Components/ContactForm';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';

const defaultContacts =[
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
  
const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(
    window.localStorage.getItem('contacts')
  ) ?? defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const handleAddContacts = (name, number) => {
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    const coincidence = contacts.find(item => item.name === name);
    if (coincidence) {
      alert(`${name} is already in contacts`);
      return;
    }
     
    setContacts(prevContacts => [contact, ...prevContacts]);
  };
  
  const changeFilter = e => {
    let currentValue = e.currentTarget.value;
    setFilter(currentValue);
  };
  
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  
  const onDeleteContact = contactId => {
    let filteredContact = contacts.filter(contact => contact.id !== contactId);
    setContacts(filteredContact);
    
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm handleAddContacts={handleAddContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        filteredEl={getVisibleContacts()}
        contacts={contacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};

export default App;
