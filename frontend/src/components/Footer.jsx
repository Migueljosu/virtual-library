import React from "react";

const Footer = () => {
  return (
    <footer className="text-wood-brown py-8">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-xl font-bold">Library Virtual</h3>
          <p className="text-gray mt-2">Your gateway to the world of books</p>
        </div>
        <div className="flex justify-center gap-8 mb-6">
          <a href="/about" className="hover:text-gray-300 transition-all duration-300">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-300 transition-all duration-300">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-300 transition-all duration-300">
            Privacy Policy
          </a>
        </div>
        <div>
          <p className="text-gray">Follow us on social media:</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://facebook.com" className="hover:text-gray-300 transition-all duration-300">Facebook</a>
            <a href="https://twitter.com" className="hover:text-gray-300 transition-all duration-300">Twitter</a>
            <a href="https://instagram.com" className="hover:text-gray-300 transition-all duration-300">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
