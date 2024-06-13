'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const Outfits = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const fetchOutfits = async () => {
      const { data, error } = await supabase
        .from('outfits')
        .select(`
          id,
          description,
          tops: tops_id ( id, image ),
          pants: pants_id ( id, image ),
          outerwear: outerwear_id ( id, image ),
          shoes: shoes_id ( id, image ),
          headwear: headwear_id ( id, image ),
          accessories: accessories_id ( id, image )
        `);

      if (error) console.error(error);
      else setOutfits(data);
    };

    fetchOutfits();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Outfits</h1>
      <div className="grid grid-cols-3 gap-4">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="border p-4">
            <p className="description">{outfit.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {outfit.tops && <img src={outfit.tops.image} alt="Top" />}
              {outfit.pants && <img src={outfit.pants.image} alt="Pants" />}
              {outfit.outerwear && <img src={outfit.outerwear.image} alt="Outerwear" />}
              {outfit.shoes && <img src={outfit.shoes.image} alt="Shoes" />}
              {outfit.headwear && <img src={outfit.headwear.image} alt="Headwear" />}
              {outfit.accessories && <img src={outfit.accessories.image} alt="Accessories" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outfits;
