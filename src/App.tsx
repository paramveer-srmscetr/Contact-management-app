import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="p-8 font-extrabold text-xl bg-slate-900  text-purple-100">
        <nav className="mb-4">
          <Link to="/" className="mr-4 hover:text-green-400">Home</Link>
          <Link to="/dashboard" className="mr-4 hover:text-green-400">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center hover:text-green-400 ">Contacts Page</h1>
              <ContactForm />
              <ContactList />
            </div>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
