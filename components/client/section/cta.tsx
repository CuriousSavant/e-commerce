import React from 'react'

const Cta = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800">สินค้าทั้งหมด</h2>
            <p className="mt-2 text-sm text-gray-600">เข้าร่วมกับเราวันนี้และสัมผัสประสบการณ์ที่ดีที่สุด</p>
            <a
                href="#your-link"
                className="px-6 py-3 mt-4 text-lg font-semibold text-white transition duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-lg hover:bg-green-600 hover:scale-105"
            >
                เริ่มเลย!
            </a>
        </div>
    )
}

export default Cta