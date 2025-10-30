'use client';

import { useSearch } from '@/Context/SearchContext';

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Search happens automatically through context
    }
  };

  return (
    <div className="bg-[#f9f9f9] shadow-[0_2px_16px_0_#0000001A]">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.png" alt="logo" draggable={false} className="w-[100px] h-[55px]" />
          </div>
          <div className="flex gap-[16px]">
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-[#EDEDED] text-[#727272] w-[340px] h-[42px] px-[16px] py-[12px] rounded"
            />
            <button className="w-[87px] h-[42px] bg-[#FFD643] text-[#161616] px-[20px] text-center rounded-[8px] flex items-center justify-center">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;