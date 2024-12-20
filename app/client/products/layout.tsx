'use client';
import React from 'react';
import { MenuItem, Select, IconButton } from '@mui/material';
import { PiGridNineFill } from 'react-icons/pi';
import { MdViewList } from 'react-icons/md';
import { useSearchContext } from '@/app/context/ProductSearchContext';
<MenuItem value="createdAt">ค่าเริ่มต้น</MenuItem>

const SearchLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { sortOption, viewMode, setViewMode, setSortOption, categorys, filteredProducts } = useSearchContext();

    return (
        <>
            <div className="mt-24 mb-6 flex flex-col md:flex-row md:justify-end md:items-center px-6">
                {/* หมวดหมุ่ */}
                <div className="flex gap-1 items-center mr-3 w-full md:w-auto mb-2">
                    <h1 className="text-gray-400 whitespace-pre w-[5rem]">หมวดหมุ่: </h1>
                    <Select
                        size="small"
                        className="bg-white border border-gray-300 rounded w-full md:w-auto"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        displayEmpty
                    >
                        {categorys.map((item) => {
                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-1 items-center mr-3 w-full md:w-auto">
                    <h1 className="text-gray-400 whitespace-pre w-[5rem]">จัดเรียง: </h1>
                    <Select
                        size="small"
                        className="bg-white border border-gray-300 rounded w-full md:w-auto"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="createdAt">ค่าเริ่มต้น</MenuItem>
                        <MenuItem value="title">เรียงตามชื่อ</MenuItem>
                        <MenuItem value="lowPrice">เรียงตามราคาที่ต่ำที่สุด</MenuItem>
                        <MenuItem value="highPrice">เรียงตามราคาที่สูงที่สุด</MenuItem>
                    </Select>
                </div>

                {/* View Options */}
                <div className="flex gap-1 items-center text-gray-400">
                    <div>View:</div>
                    <IconButton
                        aria-label="grid view"
                        size="small"
                        color={viewMode === 'grid' ? 'primary' : 'default'}
                        onClick={() => setViewMode('grid')}
                    >
                        <PiGridNineFill size={24} />
                    </IconButton>
                    <IconButton
                        aria-label="list view"
                        size="small"
                        color={viewMode === 'list' ? 'primary' : 'default'}
                        onClick={() => setViewMode('list')}
                    >
                        <MdViewList size={24} />
                    </IconButton>
                </div>
            </div>
            <main>{children}</main>
        </>
    );
};

export default SearchLayout;