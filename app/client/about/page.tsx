'use client'
import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center mx-auto px-4 pt-44 min-h-screen max-w-screen-sm'>
      <h1 className='text-2xl font-semibold border-b-4 border-gray-800 mb-2 md:mb-8'>เกี่ยวกับเรา</h1>
      <p>
        สวัสดีครับผมชื่ออาร์ม ปัจจุบันเป็น junior developer ที่กำลังสร้างตัว เรียนรู้เทคโนโลยีต่างๆเพื่อพัฒนาสกิลตัวเอง นี่เป็นเว็บไซต์ที่ใหญ่ที่สุดที่ผมเคยทำเลยครับ เว็บไซต์นี้เป็นประเภท e-commerce เนื้อหาและสินค้าบนเว็บไซต์นี้ไม่มีการจำหน่ายจริง และไม่สามารถใช้งานในเชิงพาณิชย์ได้(คิดคำไม่ออกละว่าต้องพิมพ์ยังไงต่อ อิ-อิ)
      </p>
      <div className='mt-4 flex flex-col items-center'>
        <Typography variant='subtitle2'>Credit รูปภาพสินค้า และ ข้อมูลรายละเอียดสินค้า</Typography>
        <Link href={'https://www.bnn.in.th/th'} className='text-blue-500 underline'>https://www.bnn.in.th/th</Link>
      </div>
    </div>
  )
}

export default page