'use client'

import { useState } from 'react';

const tags = {
  categories: ["Tops", "Pants", "Outerwear", "Shoes", "Headwear", "Accessories"],
  colors: ["White", "Cream", "Beige", "Light-Gray", "Dark-Gray", "Black", "Light-Blue", "Yellow", "Pink", "Blue", "Purple", "Red", "Brown", "Navy", "Khaki", "Orange", "Silver", "Gold", "Light-Purple", "Green", "Colorful"],
  materials: ["Cotton", "Linen", "Polyester", "Metal", "Lace", "Knit, Wool", "Fur", "Tweed", "Nylon", "Denim", "Leather", "Suede", "Velvet", "Chiffon", "Silk", "Corduroy", "Other Materials"]
};

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const handleImageUpload = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    const newItem = {
      image: selectedImage,
      category: selectedCategory,
      color: selectedColor,
      material: selectedMaterial,
    };
  
    const storedCloset = JSON.parse(localStorage.getItem('closet')) || [];
    storedCloset.push(newItem);
    localStorage.setItem('closet', JSON.stringify(storedCloset));
  
    // Redirect to home page after saving
    window.location.href = '/closet';
  };
  

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center border border-gray-300 p-4 rounded-md">
        <div className="mb-4">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected clothing" className="w-40 h-40 object-cover rounded-md" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-gray-300 rounded-md">
              <span>No image</span>
            </div>
          )}
        </div>
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        <div className="flex flex-col items-start mb-4">
          <div className="mb-2">Category</div>
          <div className="flex flex-wrap gap-2">
            {tags.categories.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 border rounded-md ${selectedCategory === tag ? 'bg-neutral-700' : ''}`}
                onClick={() => setSelectedCategory(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start mb-4">
          <div className="mb-2">Color</div>
          <div className="flex flex-wrap gap-2">
            {tags.colors.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 border rounded-md ${selectedColor === tag ? 'bg-neutral-700' : ''}`}
                onClick={() => setSelectedColor(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start mb-4">
          <div className="mb-2">Material</div>
          <div className="flex flex-wrap gap-2">
            {tags.materials.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 border rounded-md ${selectedMaterial === tag ? 'bg-neutral-700' : ''}`}
                onClick={() => setSelectedMaterial(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleSave} className="px-6 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-800">Save</button>
      </div>
    </div>
  );
};

export default Upload;
