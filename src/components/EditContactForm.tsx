import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Contact, editContact } from '../features/contacts/contactslice';

interface EditContactFormProps {
  contact: Contact;
  onClose: () => void;
}

const EditContactForm: React.FC<EditContactFormProps> = ({ contact, onClose }) => {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editContact({ id: contact.id, name, email, phone }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-slate-700 p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border bg-slate-700 border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border bg-slate-700 border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-2 border bg-slate-700 border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactForm;
