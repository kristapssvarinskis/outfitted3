'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SignOutButton from '../components/SignOutButton';

const Closet = () => {
  const [closet, setCloset] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const storedCloset = JSON.parse(localStorage.getItem('closet')) || [];
    setCloset(storedCloset);
  }, []);

  const handleDelete = (index) => {
    const updatedCloset = closet.filter((_, i) => i !== index);
    setCloset(updatedCloset);
    localStorage.setItem('closet', JSON.stringify(updatedCloset));
  };

 

  return (
    <main className="min-h-screen bg-neutral-600 text-neutral-300 relative">
      <div className="absolute top-4 right-4">
        <SignOutButton />
      </div>
      <button className="bg-neutral-700 text-neutral-400 font-bold py-2 px-4 rounded hover:bg-neutral-800 absolute top-4 right-36">
        Profile
      </button>
      <div className="bg-neutral-600 p-3 h-20 text-2xl border-b-4 border-neutral-700 shadow-lg">
        <a className="flex items-center justify-between p-3" href="/">Outfitted</a>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Closet</h1>
          <Link legacyBehavior href="/upload">
            <a className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 text-neutral-400 font-bold rounded-md">Add New Item</a>
          </Link>
        </div>

        <div className="flex gap-2 mb-4">
          {['All', 'Tops', 'Outerwear', 'Pants', 'Shoes', 'Headwear', 'Accessories'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 border border-neutral-600 bg-neutral-700 shadow-lg rounded-md ${filter === category ? 'bg-neutral-800' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {closet.map((item, index) => (
            <div key={index} className="border p-4 rounded-md">
              {/* Debugging log */}
              {console.log("Item:", item)}

              <img src={item.image} alt={`Item ${index}`} className="w-full h-40 object-cover mb-2 rounded-md" />

              <div><strong>Category:</strong> {item.category}</div>
              <div><strong>Color:</strong> {item.color}</div>
              <div><strong>Material:</strong> {item.material}</div>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Closet;
