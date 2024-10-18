import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase"; // Ensure correct path
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function About() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [description, setDescription] = useState("");

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const proCollection = collection(db, 'alllProducts');
                const productSnapshot = await getDocs(proCollection);
                const productList = productSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []); // Runs once on component mount

    // Delete a product
    const handleDelete = async (id) => {
        try {
            const productDoc = doc(db, 'alllProducts', id);
            await deleteDoc(productDoc);
            setProducts(products.filter(product => product.id !== id)); // Update local state
        } catch (error) {
            console.error("Error deleting product: ", error);
        }
    };

    // Update a product
    const handleUpdate = async (id) => {
        try {
            const productDoc = doc(db, 'alllProducts', id);
            await updateDoc(productDoc, { description });
            setProducts(products.map(product => 
                product.id === id ? { ...product, description } : product
            ));
            setEditingId(null); // Close the edit form
            setDescription(""); // Clear the description
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Posts</h1>
            <ul className="grid grid-cols-1 gap-6">
                {products.map(product => (
                    <li key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img 
                            src={product.image} 
                            alt={product.description} 
                            className="w-full h-64 object-cover" 
                        />
                        <div className="p-4">
                            <p className="text-lg font-medium">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                {editingId === product.id ? (
                                    <div className="flex items-center space-x-2">
                                        <input 
                                            type="text" 
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)} 
                                            placeholder="Update Description" 
                                            className="border border-gray-300 rounded-md p-2 flex-1"
                                        />
                                        <button 
                                            onClick={() => handleUpdate(product.id)} 
                                            className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600 transition"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setEditingId(null); // Cancel edit
                                                setDescription(""); // Clear the description
                                            }} 
                                            className="bg-gray-300 text-black font-semibold py-1 px-3 rounded-md hover:bg-gray-400 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={() => {
                                                setEditingId(product.id);
                                                setDescription(product.description); // Populate the input for editing
                                            }} 
                                            className="bg-yellow-400 text-white font-semibold py-1 px-3 rounded-md hover:bg-yellow-500 transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)} 
                                            className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default About;
