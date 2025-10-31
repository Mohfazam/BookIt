"use client";

import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [experience, setExperience] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

 
  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    console.log(storedData);
    if (storedData) {
      setExperience(JSON.parse(storedData));
    }
  }, []);

  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

const title = experience?.experience || "No Experience selected"; 
const date = experience?.selectedDate;
const time = experience?.selectedTime;
const subtotal = experience?.subtotal || 0;
const taxes = experience?.taxes || 0;
const total = experience?.totalPrice || 0;
const price = subtotal / (experience?.quantity || 1); 


  
  const handleConfirm = () => {
    console.log("Booking confirmed:", { experience, quantity, total });
    
    router.push("/confirmation");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6 mb-4">
        {/* Back Button */}
        <div className="flex w-[74px] h-[20px] text-[#000000] justify-between items-center hover:cursor-pointer py-6">
          <button
            onClick={() => router.back()}
            className="flex justify-between items-center w-[74px] h-[20px]"
          >
            <ArrowLeft size={20} />
            <span className="block text-[14px] leading-[18px]">Details</span>
          </button>
        </div>

        {/* Checkout Card */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-[387px] px-[24px] py-[24px] rounded-[12px] bg-[#EFEFEF] flex flex-col gap-4">
            
            <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565] font-normal">
                Experience
              </span>
              <span className="text-[16px] leading-[20px] text-[#161616] -tracking-[0.25px] text-right">
                {title}
              </span>
            </div>


          <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565] font-normal">
                Date
              </span>
              <span className="text-[16px] leading-[20px] text-[#161616] -tracking-[0.25px] text-right">
                <p>{new Date(date).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
              </span>
            </div>

            <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565] font-normal">
                Time
              </span>
              <span className="text-[16px] leading-[20px] text-[#161616] -tracking-[0.25px] text-right">
                <p>{time}</p>
              </span>
            </div>

            <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565]">
                Quantity
              </span>
              <div className="text-[18px] leading-[22px] text-[#161616] flex items-center gap-2">
                
                <span className="block min-w-[20px] text-center text-[14px] leading-[14px]">
                  {quantity}
                </span>
                
              </div>
            </div>


            

            <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565]">
                Subtotal
              </span>
              <span className="text-[18px] leading-[22px] text-[#161616] text-right">
                ₹{subtotal}
              </span>
            </div>

          
            <div className="w-full flex justify-between items-center">
              <span className="block text-[16px] leading-[20px] text-[#656565]">
                Taxes
              </span>
              <span className="text-[18px] leading-[22px] text-[#161616] text-right">
                ₹{taxes}
              </span>
            </div>

            
            <div className="w-full h-[1px] bg-[#D9D9D9]" />

         
            <div className="w-full flex justify-between items-center">
              <span className="block text-[20px] leading-[24px] font-bold text-[#161616]">
                Total
              </span>
              <span className="text-[20px] leading-[24px] text-[#161616] font-bold text-right">
                ₹{total}
              </span>
            </div>

           
            <button
              onClick={handleConfirm}
              className="w-full h-[44px] rounded-[8px] bg-[#FFD643] hover:bg-[#ffc107] transition-colors flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-normal text-[#161616] text-center">
                Confirm
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
