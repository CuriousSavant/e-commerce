'use client';
import React from 'react';
import { MenuItem, Select, IconButton } from '@mui/material';
import { PiGridNineFill } from 'react-icons/pi';
import { MdViewList } from 'react-icons/md';
import { useSearchContext } from '@/context/ProductSearchContext';

/*
    Layout Component สำหรับการจัดเรียงและแสดงผลสินค้า
    - มีการใช้ Select สำหรับเลือกหมวดหมู่สินค้า
    - มีการใช้ IconButton สำหรับเปลี่ยนโหมดการแสดงผลสินค้า (Grid/List)
    - มีการใช้ useSearchContext เพื่อจัดการสถานะของการค้นหาและการแสดงผลสินค้า
*/

const SearchLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        sortOrder,
        viewMode,
        setViewMode,
        setSortOrder,
        categories,
        setSelectedCategory,
        selectedCategory,
        filterPrice,
        setFilterPrice,
    } = useSearchContext();

    return (
        <>
            <div className="mt-24 mb-6 flex flex-col md:flex-row md:justify-end md:items-center px-6">
                {/* หมวดหมุ่ */}
                <div className="flex gap-1 items-center mr-3 w-full md:w-auto mb-2 md:mb-0">
                    <h1 className="text-gray-400 whitespace-pre w-[5rem] md:w-auto">หมวดหมุ่: </h1>
                    <Select
                        size="small"
                        className="bg-white border border-gray-300 rounded w-full md:w-auto"
                        value={selectedCategory || "สินค้าแนะนำ"}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="สินค้าแนะนำ">สินค้าแนะนำ</MenuItem>
                        {categories.map((item) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </div>

                {/* Sort Options */}
                <div className="flex gap-1 items-center mr-3 w-full md:w-auto">
                    <h1 className="text-gray-400 whitespace-pre w-[5rem] md:w-auto">กรอง: </h1>
                    <Select
                        size="small"
                        className="bg-white border border-gray-300 rounded w-full md:w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <MenuItem value="asc">เก่า - ใหม่</MenuItem>
                        <MenuItem value="desc">ใหม่ - เก่า</MenuItem>
                    </Select>

                    <h1 className="text-gray-400 whitespace-pre w-[5rem] md:w-auto">กรองตามราคา: </h1>
                    <Select
                        size="small"
                        className="bg-white border border-gray-300 rounded w-full md:w-auto"
                        value={filterPrice}
                        onChange={(e) => setFilterPrice(e.target.value)}
                    >
                        <MenuItem value="all">ค่าเริ่มต้น</MenuItem>
                        <MenuItem value="low-high">เรียงตามราคาที่ต่ำที่สุด</MenuItem>
                        <MenuItem value="high-low">เรียงตามราคาที่สูงที่สุด</MenuItem>
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