"use client";
import axios from "axios";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [experience, setExperience] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [validPromo, setValidPromo] = useState(false);
  const [promoData, setPromoData] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    console.log(storedData);
    if (storedData) {
      setExperience(JSON.parse(storedData));
    }
  }, []);

  const title = experience?.experience || "No Experience selected";
  const date = experience?.selectedDate;
  const time = experience?.selectedTime;
  const subtotal = experience?.subtotal || 0;
  const taxes = experience?.taxes || 0;
  const baseTotal = experience?.totalPrice || 0;
  
  
  const basePrice = experience?.basePrice || subtotal;

  
  const displayTotal = baseTotal - discount;

  const handlePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.value);
    setPromoError("");
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validatePromo = async () => {
    if (!promo.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    try {
      setIsLoading(true);
      setPromoError("");
      const response = await axios.get(
        `https://bookitbackend.vercel.app/api/v1/public/promos/${promo}`
      );

      if (response.data.success && response.data.data.isActive) {
        setValidPromo(true);
        setPromoData(response.data.data);

        
        let discountAmount = 0;
        if (response.data.data.discountType === "FLAT") {
          discountAmount = response.data.data.value;
        } else if (response.data.data.discountType === "PERCENTAGE") {
          discountAmount = (baseTotal * response.data.data.value) / 100;
        }

        setDiscount(discountAmount);
      } else {
        setPromoError("Invalid or inactive promo code");
        setValidPromo(false);
        setDiscount(0);
      }
    } catch (error) {
      console.error("Promo validation error:", error);
      setPromoError("Invalid promo code");
      setValidPromo(false);
      setDiscount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    
    if (!name.trim()) {
      alert("Please enter your full name");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    if (!experience?.experienceId || !experience?.slotId) {
      alert("Booking data is incomplete. Please go back and select your experience again.");
      return;
    }

    try {
      setIsLoading(true);

      // Backend expects the BASE experience price (without taxes)
      // If promo is applied, calculate the discounted base price
      let priceToSend = basePrice;
      
      if (validPromo && promoData) {
        if (promoData.discountType === "PERCENTAGE") {
          priceToSend = basePrice * (1 - promoData.value / 100);
        } else if (promoData.discountType === "FLAT") {
          priceToSend = basePrice - promoData.value;
        }
      }

      const bookingData = {
        experienceId: experience.experienceId,
        slotId: experience.slotId,
        fullName: name,
        email: email,
        totalPrice: parseFloat(priceToSend.toFixed(2)),
        ...(validPromo && promoData ? { promoCode: promoData.code } : {}),
      };

      console.log("Booking data being sent:", bookingData);
      console.log("Debug - basePrice:", basePrice, "priceToSend:", priceToSend);

      const response = await axios.post(
        "https://bookitbackend.vercel.app/api/v1/public/bookings",
        bookingData
      );

      if (response.data) {
        console.log("Booking confirmed:", response.data);
        alert(`Booking confirmed: ${response.data}`);
        localStorage.setItem("confirmationData", JSON.stringify(response.data));
        router.push("/confirmation");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      if (error.response?.data?.error) {
        alert(`Booking failed: ${error.response.data.error}\nExpected: ${error.response.data.expectedPrice}`);
      } else {
        alert("An error occurred while processing your booking. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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

        <div className="flex justify-between">
          <div className="w-[739px] h-[198px] px-[24px] py-[20px] rounded-[12px] bg-[#EFEFEF] flex flex-col gap-[32px]">
            <div className="flex gap-[24px]">
              <div className="flex flex-col w-[333px] h-[68px] gap-[8px]">
                <span className="text-[#5B5B5B] leading-[18px] text-[14px]">
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  className="w-[333px] h-[42px] px-[16px] py-[12px] rounded-[6px] bg-[#DDDDDD] text-[14px] leading-[18px] text-[#161616] placeholder:text-[#727272]"
                  onChange={handleName}
                />
              </div>

              <div className="flex flex-col w-[333px] h-[68px] gap-[8px]">
                <span className="text-[#5B5B5B] leading-[18px] text-[14px]">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  className="w-[333px] h-[42px] px-[16px] py-[12px] rounded-[6px] bg-[#DDDDDD] text-[14px] leading-[18px] text-[#161616] placeholder:text-[#727272]"
                  onChange={handleEmail}
                />
              </div>
            </div>
            <span className="text-[#727272] text-[10px] block absolute top-[42%]">
              Apply <span className="text-[#24AC39]">'SAVE10'</span> For instant
              10% Discount
            </span>
            <div className="flex gap-[24px]">
              <div className="flex w-[691px] flex-col gap-[8px]">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promo}
                    disabled={validPromo}
                    className="w-[604px] h-[42px] px-[16px] py-[12px] rounded-[6px] bg-[#DDDDDD] text-[14px] leading-[18px] text-[#161616] placeholder:text-[#727272] disabled:opacity-60"
                    onChange={handlePromo}
                  />
                  <button
                    onClick={validatePromo}
                    disabled={isLoading || validPromo}
                    className="w-[71px] h-[42px] px-[16px] py-[12px] rounded-[8px] bg-[#161616] text-[14px] leading-[18px] text-[#F9F9F9] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2a] transition-colors"
                  >
                    {validPromo ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoError && (
                  <span className="text-red-500 text-[12px] leading-[16px]">
                    {promoError}
                  </span>
                )}
                {validPromo && (
                  <span className="text-[#24AC39] text-[12px] leading-[16px]">
                    ✓ Promo code applied! You saved ₹{discount.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
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
                  <p>
                    {date && new Date(date)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </p>
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
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="w-full flex justify-between items-center">
                <span className="block text-[16px] leading-[20px] text-[#656565]">
                  Taxes
                </span>
                <span className="text-[18px] leading-[22px] text-[#161616] text-right">
                  ₹{taxes.toFixed(2)}
                </span>
              </div>

              {validPromo && discount > 0 && (
                <div className="w-full flex justify-between items-center">
                  <span className="block text-[16px] leading-[20px] text-[#24AC39]">
                    Discount ({promoData?.code})
                  </span>
                  <span className="text-[18px] leading-[22px] text-[#24AC39] text-right">
                    -₹{discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="w-full h-[1px] bg-[#D9D9D9]" />

              <div className="w-full flex justify-between items-center">
                <span className="block text-[20px] leading-[24px] font-bold text-[#161616]">
                  Total
                </span>
                <span className="text-[20px] leading-[24px] text-[#161616] font-bold text-right">
                  ₹{displayTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="w-full h-[44px] rounded-[8px] bg-[#FFD643] hover:bg-[#ffc107] transition-colors flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-normal text-[#161616] text-center">
                  {isLoading ? "Processing..." : "Pay and Confirm"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}