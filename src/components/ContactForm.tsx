import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../features/contacts/contactslice';
import { v4 as uuidv4 } from 'uuid';

  const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    dispatch(addContact({ id: uuidv4(), name, email, phone }));
    setName('');
    setEmail('');
    setPhone('');
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border text-black border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border text-black border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border text-black border-gray-300 rounded-md w-full"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
