import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      {user ? (
        <div className="flex items-center">
          <img 
            src={user.photoURL} 
            alt="User Avatar" 
            className="rounded-full w-10 h-10 mr-2" 
          />
          <h1 className="text-white mr-4">{user.displayName}</h1>
        </div>
      ) : (
        <h1 className="text-white text-2xl">Navbar</h1>
      )}

      <div className="flex space-x-4">
        {user ? (
          <>
            <Link 
              to="/" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Upload
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Posts
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Contact
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/about" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Posts
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
