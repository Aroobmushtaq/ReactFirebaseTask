import React from 'react';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const data = await signInWithPopup(auth, provider);
            console.log(data);
            navigate("/home"); // Redirect to home after successful login
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                <form>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email" 
                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                        required
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder="Enter Your Password" 
                        className="border border-gray-300 rounded-md p-2 w-full mb-4"
                        required
                    />
                    <br />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white font-semibold py-2 rounded-md w-full hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                    <h3 className="text-center my-4">OR</h3>
                    <button 
                        type="button" 
                        onClick={handleLogin} 
                        className="bg-red-500 text-white font-semibold py-2 rounded-md w-full hover:bg-red-600 transition"
                    >
                        Login With Google
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
