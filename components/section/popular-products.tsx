'use client'
import React from 'react'

const popularProduct = [
    // { productName: "iPhone 16 Pro Max", desc: "ผลิตภัณฑ์ตระกูล Pro ขับเคลื่อนด้วยชิป A18 Pro ที่มีประสิทธิภาพ CPU ระดับชั้นแนวหน้าของอุตสาหกรรม และมาพร้อมจอภาพขนาดใหญ่ขึ้น ตัวควบคุมกล้อง คุณสมบัติด้านกล้องระดับโปรที่ล้ำสมัย และแบตเตอรี่ที่ใช้งานได้นานขึ้นแบบก้าวกระโดดครั้งใหญ่", urlImage: "/imgs/services/121031-iphone-16-pro.png" },
    { productName: "Galaxy S24 Ultra", desc: "พบกับ Galaxy S24 FE ที่มาพร้อมกับ Galaxy AI ให้ทุกภาพถ่ายจุดประกายความคิดสร้างสรรค์อันไม่มีที่สิ้นสุด ดื่มด่ำไปกับประสบการณ์ Galaxy AI อย่างเต็มรูปแบบและปลดล็อกวิธีนับไม่ถ้วนในการสำรวจจินตนาการของคุณ ถ่าย วงกลม แตะ – ค้นหาว่าเพราะเหตุใดจึงคุ้มค่า", urlImage: "/imgs/services/galaxy-s24-ultra-highlights-color-carousel-exclusive.jpg" },
    // { productName: "MacBook Pro M4", desc: "MacBook Pro ใหม่ของ Apple มาพร้อมชิปตระกูล M4 ที่ทรงพลังเหลือล้นด้วยกล้อง 12MP Center Stage ที่เหนือชั้น, Thunderbolt 5 บนชิป M4 Pro และ M4 Max รวมถึงตัวเลือกจอภาพ Nano-texture ใหม่ล่าสุด ซึ่งทั้งหมดนี้ทำให้ MacBook Pro มากความสามารถยิ่งขึ้น และโปรสมชื่อยิ่งกว่าเดิม", urlImage: "/imgs/services/macbook-pro-color-black.jpg" },
]

const PopularProduct = () => {
    return (
        <div className="px-10 md:px-32 py-14">
            <div className="gap-8 items-center">
                {popularProduct.map((product, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center md:items-start bg-neutral-800 rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-6">
                        <div className="w-full md:w-1/2 h-[368px] bg-cover bg-center">
                            <img
                                src={product.urlImage}
                                alt={product.productName}
                                className="object-cover h-full w-full rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2 text-white">
                            <h1 className="text-3xl font-semibold my-4 text-center md:text-left">{product.productName}</h1>
                            <p className="text-lg md:text-base leading-relaxed mb-4">{product.desc}</p>
                            <div className="text-center md:text-left">
                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm mt-6">
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularProduct;