'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Profile() {
  const [profile, setProfile] = useState({
    avatar_url: '',
    full_name: '',
    email: '',
  });

  const [formValues, setFormValues] = useState({
    full_name: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userResponse } = await supabase.auth.getUser();
      const user = userResponse.user;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setFormValues({ full_name: data.full_name, email: data.email});
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const { data: userResponse } = await supabase.auth.getUser();
    const user = userResponse.user;

    const updates = {
      ...profile,
      full_name: formValues.full_name,
      email: formValues.email,
      user_id: user.id,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(updates, { returning: 'minimal' });

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      setProfile(updates);
    }
  };

  return (
    <div className="pt-56 flex items-center justify-center bg-neutral-600">
      <div className="w-96 bg-neutral-700 shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-xl text-neutral-400">{profile.full_name}</h2>
          <p className="text-neutral-400">{profile.email}</p>
        </div>
        <div className="mt-4">
          <label className="block text-gray-300">Full Name</label>
          <input
            type="text"
            value={formValues.full_name}
            onChange={(e) => setFormValues({ ...formValues, full_name: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-neutral-400">Email</label>
          <input
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            className="mt-1 p-2 border border-neutral-400 rounded w-full"
          />
        </div>
        <button
          onClick={updateProfile}
          className="mt-4 w-full bg-neutral-700 hover:bg-neutral-800 shadow-lg border border-neutral-800 text-white py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
