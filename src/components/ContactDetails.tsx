import React from 'react';
import { Contact } from '../features/contacts/contactslice';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-slate-700 p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Contact Details</h2>
        <p className="text-lg"><strong>Name:</strong> {contact.name}</p>
        <p className="text-lg"><strong>Email:</strong> {contact.email}</p>
        <p className="text-lg"><strong>Phone:</strong> {contact.phone}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactDetails;
