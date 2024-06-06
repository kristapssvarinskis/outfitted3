'use client'

import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const tags = {
  categories: ["Tops", "Pants", "Outerwear", "Shoes", "Headwear", "Accessories"],
  colors: ["White", "Cream", "Beige", "Light-Gray", "Dark-Gray", "Black", "Light-Blue", "Yellow", "Pink", "Blue", "Purple", "Red", "Brown", "Navy", "Khaki", "Orange", "Silver", "Gold", "Light-Purple", "Green", "Colorful"],
  materials: ["Cotton", "Linen", "Polyester", "Metal", "Lace", "Knit, Wool", "Fur", "Tweed", "Nylon", "Denim", "Leather", "Suede", "Velvet", "Chiffon", "Silk", "Corduroy", "Other Materials"]
};

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setUploading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated for photo upload");
      }

      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `user_uploads/${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('clothes')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data, error: publicUrlError } = supabase.storage
        .from('clothes')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      if (publicUrlError || !publicUrl) {
        console.error("Failed to get public URL", publicUrlError);
        throw new Error("Failed to get public URL");
      }

      console.log("Public URL:", publicUrl);

      const newItem = {
        image: publicUrl,
        category: selectedCategory,
        color: selectedColor,
        material: selectedMaterial,
      };

      const storedCloset = JSON.parse(localStorage.getItem('closet')) || [];
      storedCloset.push(newItem);
      localStorage.setItem('closet', JSON.stringify(storedCloset));

      console.log("Item saved to local storage:", storedCloset); // Debugging

      const { error: insertError } = await supabase
        .from('clothes')
        .insert([newItem]);

      if (insertError) {
        throw insertError;
      }

      router.push('/upload');
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center border border-neutral-500 p-4 rounded-md">
        <div className="mb-4">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected clothing" className="w-40 h-40 object-cover rounded-md" />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border border-neutral-500 rounded-md">
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
                className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-800 shadow-lg rounded-md ${selectedCategory === tag ? 'bg-neutral-700 text-white' : ''}`}
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
                className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-800 shadow-lg rounded-md ${selectedColor === tag ? 'bg-neutral-700 text-white' : ''}`}
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
                className={`px-4 py-2 bg-neutral-700 hover:bg-neutral-800 shadow-lg rounded-md ${selectedMaterial === tag ? 'bg-neutral-700 text-white' : ''}`}
                onClick={() => setSelectedMaterial(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleSave} className="px-6 py-2 bg-neutral-700 hover:bg-neutral-800 text-white rounded-md" disabled={uploading}>
          {uploading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Upload;