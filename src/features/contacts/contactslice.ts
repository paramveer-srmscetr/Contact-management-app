import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactState {
  contacts: Contact[];
}

const loadContactsFromLocalStorage = (): Contact[] => {
  const storedContacts = localStorage.getItem('contacts');
  return storedContacts ? JSON.parse(storedContacts) : [];
};

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const initialState: ContactState = {
  contacts: loadContactsFromLocalStorage(),
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
        saveContactsToLocalStorage(state.contacts);
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;

export default contactSlice.reducer;
