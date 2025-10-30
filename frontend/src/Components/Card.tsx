
const Card = () => {
    return (
        <div className="w-[280px] h-[312px] flex flex-col rounded-[12px] overflow-hidden">
            <div>
                <img src="/test2.jpg" alt="test image" draggable={true} className="object-cover h-[170px] w-[280px]" />
            </div>

            <div className="bg-[#F0F0F0] h-full overflow-hidden px-[16px] gap-[20px] py-[12px]">
                <div className="flex flex-col gap-[12px]">
                    <div className="flex justify-between">
                        <span className="inline-celx text-[16px] leading-[20px] text-[#161616]">Kayaking</span>
                        <span className="inline-flex items-center justify-center bg-[#D6D6D6] px-[8px] py-[4px] rounded-[4px] text-[11px] leading-[16px] text-[#161616]">
                            Udipi
                        </span>
                    </div>

                    <div className="h-[32px]">
                        <span className="block text-[12px] leading-[16px] text-[#6C6C6C]">Curated small-group experience. Certified guide. Safety first with gear included. </span>
                    </div>

                    <div className="flex w-[248px] h-[30px] justify-between">
                        <div className="flex gap-[6px] text-[#161616] items-center">
                            <span className="leading-[16px] text-[12px]">From</span>
                            <span className="text-[20px] leading-[24px]">₹999</span>
                        </div>
                        <button className="w-[99px] h-[30px] px-[8px] py-[6px] rounded-[4px] bg-[#FFD643]">
                            <span className="block text-[#161616] text-[12px] leading-[18px]">View Details</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
