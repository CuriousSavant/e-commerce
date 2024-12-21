'use client'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mx-auto px-4 pt-44 min-h-screen max-w-screen-sm'>
      <h1 className='text-2xl font-semibold border-b-4 border-gray-800 mb-2 md:mb-8'>เกี่ยวกับเรา</h1>
      <p>
        เว็บไซต์นี้เป็นเพียงแค่ตัวอย่างของโปรเจกต์เล็กๆ สำหรับการเรียนรู้และฝึกพัฒนาทักษะทางด้านการเขียนโค้ดและการสร้างเว็บแอปพลิเคชันของผมครับ เนื้อหาและสินค้าบนเว็บไซต์นี้ไม่มีการจำหน่ายจริง และไม่สามารถใช้งานในเชิงพาณิชย์ได้
      </p>
      <div className='mt-4 flex flex-col'>
        <p>Credit รูปภาพสินค้า และ ข้อมูลรายละเอียดสินค้า:</p>
        <Link href={'https://www.bnn.in.th/th'} className='text-blue-500 underline'>https://www.bnn.in.th/th</Link>
      </div>
    </div>
  )
}

export default page