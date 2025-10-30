'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Slot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

interface ExperienceDetail {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  location: string;
  about: string;
  slots: Slot[];
}

export default function ExperienceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchExperienceDetail();
    }
  }, [id]);

  const fetchExperienceDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://bookitbackend.vercel.app/api/v1/public/experiences/${id}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setExperience(result.data);
      } else {
        setError('Experience not found');
      }
    } catch (err) {
      console.error('Error fetching experience detail:', err);
      setError('Failed to load experience details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-[#161616] text-lg">Loading experience details...</div>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
          <div className="text-[#6C6C6C] text-lg">{error || 'Experience not found'}</div>
          <a href="/" className="text-[#FFD643] hover:underline">Go back to home</a>
        </div>
      </div>
    );
  }

  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{experience.title}</h1>
        <img src={experience.image} alt={experience.title} className="w-full max-w-2xl rounded-lg" />
        <p className="text-lg">{experience.description}</p>
        <p className="text-gray-600">{experience.about}</p>
        <p className="text-xl font-semibold">Price: ₹{experience.price}</p>
        <p className="text-gray-600">Location: {experience.location}</p>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experience.slots.map((slot) => (
              <div key={slot.id} className="border p-4 rounded-lg">
                <p>Date: {new Date(slot.date).toLocaleDateString()}</p>
                <p>Time: {slot.time}</p>
                <p className={slot.available ? 'text-green-600' : 'text-red-600'}>
                  {slot.available ? 'Available' : 'Not Available'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}