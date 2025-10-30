'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Minus, Plus } from "lucide-react";
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
    const [Quantity, setQuantity] = useState(1);

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
                <div className='flex w-[74px] h-[20px] text-[#000000] justify-between items-center hover:cursor-pointer py-6'>
                    <Link href={"/"} className='flex justify-between items-center w-[74px] h-[20px]'>
                        <ArrowLeft size={20} />
                        <span className='block text-[14px] leading-[18px]'>Details</span>
                    </Link>
                </div>

                <div className='flex gap-8'>


                    <div className='w-[765px] h-[381px] rounded-[12px] overflow-hidden'>
                        <img src={experience.image} alt={experience.title} className='w-full h-full object-cover' draggable={false}/>
                    </div>


                    <div className='w-[387px] h-[303px] px-[24px] py-[24px] rounded-[12px] bg-[#EFEFEF] flex flex-col gap-4'>
                        <div className='w-[339px] h-[22px] flex justify-between items-center'>
                            <span className='block w-[65px] h-[20px] text-[16px] leading-[20px] text-[#656565]'>Starts at</span>
                            <span className='w-[44px] h-[22px] text-[18px] leading-[22px] text-[#161616] text-right'>₹{experience.price}</span>
                        </div>

                        <div className='w-[339px] h-[22px] flex justify-between items-center'>
                            <span className='block w-[65px] h-[20px] text-[16px] leading-[20px] text-[#656565]'>Quantity</span>
                            <div className='w-[44px] h-[22px] text-[18px] leading-[22px] text-[#161616] flex items-center gap-2'>
                                <Minus size={16} className='hover:cursor-pointer' onClick={() => setQuantity(Quantity-1)}/>
                                    <span className='block w-[6px] h-[14px] text-[12px] leading-[14px]'>{Quantity}</span>
                                <Plus size={16} className='hover:cursor-pointer' onClick={() => setQuantity(Quantity+1)}/>
                            </div>
                        </div>

                        <div className='w-[339px] h-[22px] flex justify-between items-center'>
                            <span className='block w-[65px] h-[20px] text-[16px] leading-[20px] text-[#656565]'>Subtotal</span>
                            <span className='w-[44px] h-[22px] text-[18px] leading-[22px] text-[#161616] text-right'>₹{experience.price * Quantity}</span>
                        </div>

                        <div className='w-[339px] h-[22px] flex justify-between items-center'>
                            <span className='block w-[65px] h-[20px] text-[16px] leading-[20px] text-[#656565]'>Taxes</span>
                            <span className='w-[44px] h-[22px] text-[18px] leading-[22px] text-[#161616] text-right'>₹59</span>
                        </div>

                        <div className='w-[339px] h-[1px] bg-[#D9D9D9] '/>

                        <div className='w-[339px] h-[24px] flex justify-between items-center'>
                            <span className='block w-[48px] h-[24px] text-[20px] leading-[24px] font-bold text-[#161616]'>Total</span>
                            <span className='w-[44px] h-[22px] text-[20px] leading-[24px] text-[#161616] font-bold text-right'>₹{ (experience.price * Quantity ) + 59}</span>
                        </div>

                        <div className='w-[339px] h-[44px] px-[20px] py-[12px]  rounded-[8px] bg-[#FFD643]'>
                            <span className='block font-normal w-[62px] h-[20px] leading-[20px] text-[#161616] text-center'>Confirm</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}