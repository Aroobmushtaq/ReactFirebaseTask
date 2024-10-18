import React, { useState } from 'react';

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add code to handle form submission, like sending data to an API
        console.log("Form submitted:", { name, email, message });

        // Clear the form
        setName("");
        setEmail("");
        setMessage("");
        setSuccess(true); // Set success to true to show a success message
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Contact Us</h1>
            {success && <p className="text-green-500 text-center mb-4">Your message has been sent successfully!</p>}
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Message:</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                        className="border border-gray-300 rounded-md p-2 w-full h-32"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Contact;
