'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Index = () => {
  const [closet, setCloset] = useState([]);

  useEffect(() => {
    const storedCloset = JSON.parse(localStorage.getItem('closet')) || [];
    setCloset(storedCloset);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Closet</h1>
        <Link href="/upload">
          <a className="px-4 py-2 bg-black text-white rounded-md">Add New Item</a>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {closet.map((item, index) => (
          <div key={index} className="border p-4 rounded-md">
            <img src={item.image} alt={`Item ${index}`} className="w-full h-40 object-cover mb-2 rounded-md" />
            <div><strong>Category:</strong> {item.category}</div>
            <div><strong>Color:</strong> {item.color}</div>
            <div><strong>Material:</strong> {item.material}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;