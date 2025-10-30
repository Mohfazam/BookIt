'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

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
                <Link href={"/"}>
                <div className='flex w-[74px] h-[20px] text-[#000000] justify-between items-center hover:cursor-pointer'>
                    <ArrowLeft size={20} />
                    <span className='block text-[14px] leading-[18px]'>Details</span>
                </div>
                </Link>
            </div>
        </div>
    );
}