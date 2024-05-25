import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteContact, Contact, editContact } from '../features/contacts/contactslice';
import ContactDetails from './ContactDetails';
import EditContactForm from './EditContactForm';

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [selectedContact, setSelectedContact] = useState<null | Contact>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewing(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsViewing(false);
    setIsEditing(false);
    setSelectedContact(null);
  };

  return (
    <div>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts available. Please add a contact.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="flex justify-between items-center p-4 border-b border-gray-300">
            <div>
              <p className="text-lg font-medium">{contact.name}</p>
              <p className="text-sm text-gray-500">{contact.email}</p>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => handleView(contact)}>
                View
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md" onClick={() => handleEdit(contact)}>
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => handleDelete(contact.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      {isViewing && selectedContact && (
        <ContactDetails contact={selectedContact} onClose={closeModal} />
      )}
      {isEditing && selectedContact && (
        <EditContactForm contact={selectedContact} onClose={closeModal} />
      )}
    </div>
  );
};

export default ContactList;
