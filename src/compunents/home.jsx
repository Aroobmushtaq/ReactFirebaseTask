import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db, storage } from "../config/firebase";
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { register, handleSubmit, reset } = useForm();
    const proCollection = collection(db, 'alllProducts');
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(''); // State to store the uploaded image URL

    const onSubmit = async (data) => {
        try {
            const imageFile = data.image[0];

            // Create a storage reference for the image
            const storageRef = ref(storage, `images/${imageFile.name}`);

            // Upload the image to Firebase Storage
            const uploadResult = await uploadBytes(storageRef, imageFile);

            // Get the download URL of the uploaded image
            const imageUrl = await getDownloadURL(uploadResult.ref);
            setImageUrl(imageUrl); // Set the image URL to state

            // Add image URL and description to Firestore
            await addDoc(proCollection, {
                image: imageUrl,  // Store the download URL instead of the file itself
                description: data.description
            });

            // Reset the form and navigate to '/about'
            reset();
            navigate('/about'); 
        } catch (error) {
            console.error("Error uploading post: ", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-20 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-5 text-center">Upload a Post</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input 
                    type="file" 
                    {...register('image')} 
                    accept="image/*" 
                    className="mb-4 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    {...register('description')} 
                    placeholder="Enter Description" 
                    className="mb-4 border border-gray-300 rounded p-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded p-2 transition duration-300"
                >
                    Submit
                </button>
            </form>
            {imageUrl && ( // Display the uploaded image with blur if the URL is available
                <div className="relative mt-5">
                    <img 
                        src={imageUrl} 
                        alt="Uploaded" 
                        className="w-full h-auto rounded-lg blur-sm" // Add blur class
                    />
                </div>
            )}
        </div>
    );
}

export default Home;
