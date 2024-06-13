'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const Create = () => {
  const [clothes, setClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState({
    tops: null,
    pants: null,
    outerwear: null,
    shoes: null,
    headwear: null,
    accessories: null,
  });
  const [filter, setFilter] = useState('All');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchClothes = async () => {
      let { data, error } = await supabase.from('clothes').select('*');
      if (error) console.error(error);
      else setClothes(data);
    };

    fetchClothes();
  }, []);

  const handleSelect = (item) => {
    console.log('Selected item:', item); // Debugging
    setSelectedClothes({
      ...selectedClothes,
      [item.category.toLowerCase()]: item,
    });
  };

  const handleDelete = (category) => {
    setSelectedClothes({
      ...selectedClothes,
      [category]: null,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const outfit = {
        tops_id: selectedClothes.tops ? selectedClothes.tops.id : null,
        pants_id: selectedClothes.pants ? selectedClothes.pants.id : null,
        outerwear_id: selectedClothes.outerwear ? selectedClothes.outerwear.id : null,
        shoes_id: selectedClothes.shoes ? selectedClothes.shoes.id : null,
        headwear_id: selectedClothes.headwear ? selectedClothes.headwear.id : null,
        accessories_id: selectedClothes.accessories ? selectedClothes.accessories.id : null,
        description: description,
      };

      const { data, error } = await supabase.from('outfits').insert([outfit]);
      if (error) throw error;

      console.log('Outfit saved:', data);
    } catch (error) {
      console.error('Error saving outfit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredClothes = filter === 'All' ? clothes : clothes.filter(item => item.category === filter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Idea</h1>
      <div className="grid grid-cols-6 gap-4 mb-4">
        {Object.entries(selectedClothes).map(([category, item]) => (
          <div key={category} className="border p-4 relative">
            <h2 className="font-bold capitalize">{category}</h2>
            {item ? (
              <>
                <img src={item.image} alt={category} />
                <button
                  onClick={() => handleDelete(category)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </>
            ) : (
              <p>No {category}</p>
            )}
          </div>
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded mb-4 bg-neutral-700 border-neutral-700 shadow-lg"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-between mb-4">
        <div>
          <button className={`px-4 py-2 ${filter === 'All' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('All')}>All</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Tops' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Tops')}>Tops</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Pants' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Pants')}>Pants</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Outerwear' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Outerwear')}>Outerwear</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Shoes' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Shoes')}>Shoes</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Headwear' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Headwear')}>Headwear</button>
          <button className={`px-4 py-2 ml-2 ${filter === 'Accessories' ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-800 rounded shadow-lg'}`} onClick={() => setFilter('Accessories')}>Accessories</button>
        </div>
        <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-800 rounded text-neutral-300" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving' : 'Save'}
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {filteredClothes.map((item) => (
          <div key={item.id} className="border p-2 cursor-pointer" onClick={() => handleSelect(item)}>
            <img src={item.image} alt={item.category} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
