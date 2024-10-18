import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2024 All Rights Reserved.</p>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">
            Facebook
          </a>
          <span>|</span>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">
            Twitter
          </a>
          <span>|</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
