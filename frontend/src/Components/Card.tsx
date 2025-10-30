
const Card = () => {
    return (
        <div className="w-[280px] h-[312px] border-2 border-red-800 flex flex-col rounded-[12px] overflow-hidden">
            <div>
                <img src="/test2.jpg" alt="test image" draggable={true} className="object-cover h-[170px] w-[280px]" />
            </div>

            <div className="bg-[#F0F0F0] h-full overflow-hidden px-[16px] py-[12px]">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex justify-between">
                        <span className="text-[16px] leading-[20px] text-[#161616]">Kayaking</span>
                        <span className="bg-[#D6D6D6] px-[6px] py-[4px] rounded-[4px] w-[48px] h-[24px] leading-[16px] text-[11px] text-[#161616]">Udipi</span>
                    </div>

                    <div>
                        <span>Curated small-group experience. Certified guide. Safety first with gear included. </span>
                    </div>

                    <div>
                        <div>
                            <span>From</span>
                            <span>₹999</span>
                        </div>
                        <button>
                            View Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
