'use client';

import { useState, useEffect } from 'react';
import CardGrid from '@/Components/CardGrid';
import { useSearch } from '@/Context/SearchContext';

interface Experience {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  location: string;
  about: string;
}

export default function Page() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://bookitbackend.vercel.app/api/v1/public/experiences/');
      const result = await response.json();
      
      if (result.success && result.data) {
        setExperiences(result.data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = searchQuery.trim()
    ? experiences.filter((exp) => {
        const query = searchQuery.toLowerCase();
        return (
          exp.title.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query) ||
          exp.location.toLowerCase().includes(query) ||
          exp.about.toLowerCase().includes(query)
        );
      })
    : experiences;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CardGrid experiences={filteredExperiences} loading={loading} />
    </div>
  );
}