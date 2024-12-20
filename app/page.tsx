import React from "react";
import HeroSection from "@/components/section/hero";
import LatestProduct from "@/components/section/latest-product";
import LayoutProduct from "@/components/layout/layout-product";
import { BsCartX } from "react-icons/bs";
import prisma from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany()

  return (
    <LayoutProduct>
      <HeroSection />
      {products.length > 0 ? (
        <LatestProduct />
      ) : (
        <div className='flex flex-col justify-center items-center min-h-[600px]'>
          <BsCartX fontSize="10rem" color="#f1f2f3" />
          <h1 className='text-3xl font-semibold text-gray-400 mt-6'>ไม่มีสินค้า</h1>
        </div>
      )}
    </LayoutProduct >
  );
}

{/* 
      พรุ่งนี้
        - ทำหน้า all products // check
        - ทำหน้า cart shopping
        - ทำหน้า product detail
        -- เริ่มหาว่าจะใช้ api หรือ ฐานข้อมูลหรืออื่นๆ
        - เรียน eng 20 นาที
     */}

{/* 

        ตอนนี้ 10/11/2024 2:15 ยอมรับตรงๆว่า ตันมาก ขอไปดูวิธีทำ ecommerce website ก่อน
        เอิมมมมม ตอนนี้ขอให้่ ai ช่วยก่อน

        พรุ่งนี้ทำหน้า product detail : ตอนนี้ 1:01 ขอไปหา design แล้วลอง design คราวๆก่อน

        หายไปนาน ตอนนี้กลับมาแล้วจะเริ่มทำ sign in, sign up ก่อน
        - 7:21 begain make a sign up router

        - 7:43 ทำ login เสร็จแล้ว

        - 10:04 เริ่มทำ profile
        - 11:28 หรือ 23:38 ทำ profile เสร็จ พัก ไปลากหัวคมๆก่อน

        - 10/24/2024 วันนี้ทำหน้า profile detail ไปแต่เน็ตไม่ดีเลย
        - 11:12 make a middleware เมื่อ user ที่ไม่ได้ loign เข้า /client/profile ให้ทำการ redirct ไปที่หน้า /client/login

        -- 9/25/2024
        - 11:32 ทำ middlware อะไรก็ไม่รู้ พรุ่งนี้ดูต่อให้หน่อย

        -- 10/25/2024
        - 6:49 ว่าจะเริ่มทำ admin dashboard ก่อน ค่อยทำ client ต่อ
        - 10:30 ยากอ่ะ เก็บรายละเอียดก่อน

        -- 10/26/2024
        - 1:21 เก็บรายละเอียดก่อนต่อ

        - 2:24 พักก่อน ปวดมือมาก

        - 3:39 เริ่มทำ CRUD
        - รายงานๆ แตดออกแรงมาก พักq

        - 4:34 เริ่มทำ CRUD
        - 5:10 เครียร์ admin page ไปแล้วทีนี้เหลือ productFrom ตอนนี้พักก่อน
        - 6:31 เริ่มทำ productFrom
        - เริ่มมา สองชั่วโมงกว่าละ ตอนนี้พักก่อน ติดเรื่องจะอัพโหลดไฟล์รูปภาพยังไง ต้องไปดูเขาทำก่อน

        10:30 10/28/2024 ทำ Admin ไปพอสมควรละ พักแป้ป 

        12:31 10/29/2024 ติดปัหาเรื่องการเข้าถึงไฟล์ e.target.files จากปกติเข้าถึงได้ แต่ตอนนี้ไม่ได้แล้วแก้้ด้วย
        2:11 10/29/2024 เน็ตไม่ดี รอสร้าง upload_preset จาก cloudinary

        6:52 เริ่มทำระบบต่อ (client)

        9:5 พักแป้ปต่อกับ cloud ได้ละ

        11:47 ไปทำหน้า form แป้ปเดะค่อยมาดูคลิปต่อ(admin)

        12:30 อยากพักเร็วๆว่ะ ทำ upload รุปภาพ และ เลือกรูปภาพหลานตัวได้ละ ที่เหลือทำ CRUD product name, description อะไรพวกนี้ ทำพวก save product ไว้ด้วย

        2:37 10/30/2024 ติดปัหาเรื่อง images คิดเอละกัน

        3:37 ไฟลดับอ่ะ ติดเรื่องการส่งข้อมูลรูปภาพให้เป็น array โดย json

        5:09 เริ่มต่อ
        5:57 พักแป้ปเหนื่อ

        7:12 พักแป้ปปวดมือ

        11:18 ติดตรง edit product อ่ะ

        12:44 ทำ CRUD admin เสร็จและ พรุ่งนี้ทำพวก category พวกนี้ต่อ

        11:00 11/1/2024
        category เสร็จแล้วจ้า ไม่พอทำ confirm delete product ด้วย วันนี้พักแป้ป ออกกำลังกายต่อ

        11/4/2024 รอไปดูความเรียบร้อยของ productForm เมื่อกี่ำเกี่ยวกับ category

        11/10/2024 ทำไปหลายส่วนแล้วทีนี้ติดเรื่อง category and properties ให้แสดง product ของใครของมัน

        11/12/2024 พรุ่งนี้จัดการเรื่อง ui ระบบทำเสร็จแล้ว เหลือคือ order, settings และ เพิ่มหน้า admin เพิ่ม

        11/13/2024 ติดเรื่องการเตรียมพร้อมสำหรับ ui และ ติด bug เลิกน้อยเรื่องการรับข้อมูล properties ว่าจะรับ value เป็ฯ array หรือ string และ พรุ่งนี้หารูปภาพให้พร้อมสำหรับทำ all Product และ หน้า product detail

        11/132024 11:07 จะนอนแล้ว ติดเรื่องการเชื่อม properties เนื่องจาก properties ที่เพิ่มจาก postman มันไม่มีการเชื่อมยงจาก id ตัวไหนเลย ทำให้ไม่แสดงใน category properties เดะค่อยแก้

        11/14/2024 9:50 พัก form register แป้ป ทำแก้ ui ของ admin  ui ก่อน
        11/15/2024 1:19 ง่วงมากๆ อยากไปพักละ ติดเรื่องของการ design product และ แปลง design จากที่ทำไว้ให้เป็นdesign ใหม่โดย mui

        11/15/2024 4:46 กด edit แล้วไปที่หนิา productForm แลัวจะรู้เองว่ามี error อะไร

        11/17 พรุ่งนี้ทำหน้า catelog และ search product หรือ all product อันนี้รอคิดดูก่อน
        11/17/24 พักหน้า all product ไปก่อน เลือก theme ที่จะใช้กับ navbar ก่อน 

        2:44 เดะค่อยมาทำหน้า product detail ต่อ

        11/18/24 ต้องทำอีกหลายอย่าง แก้ตรงส่งฟรีตลอดปี เป็นอย่างอื่นรอไปก็อบเขามาก่อน และ ปรับให้ arrow ตรงรูปอยู่ตรงกลางและเพิ่มระบบ withlist ทำ section properties แบะ หน้าชำระเงินแลรูปภาพที่จะอยู่ข้างล่างรุปภาพ และลองมอง col 2 ดูอีกครั้งแล้วมันเหมือนมีเรื่องที่ต้องเปลี่ยนอยู่นะ

        11/18/24 ตอนนี้ทำ route ของ get post put delete ของ order ไว้แล้ว 
        วันนี้ทำ product detail เสร็จแต่ระบบ wishlist ยังไม่ได้ order ทำ route ไว้แล้วแต่หน้าบ้านยังไม่ได้ทำเช่นกดชื้อสินค้าแล้วให้ order ทำงานอะไรบบนี้

        วันนี้เจอ error อะไรก็ไม่รู้ทุกอย่างที่ทำไว้ใน ...nextauth เป็ฯ undefined หมดรอแก้ด้วยว่าจะทำระบบ order แต่ได้ error เพียบ

        11/20/24 เกิดนปัณหาตรงที่ user มันหาย ถ้าอยากรู้จริงๆลอง logout และ login ใหม่และดู log ดูมันจพมีให้เห็นอยู่

        11/20/24 ไม่รู้ว่าทำอะไรไปบ้าง รู้แค่ว่าจะทำ order system แต่ไปเจอ bug ที่ ...nextauth โดย user ไม่มีค่าเป็นบางครั้งหรืออะไรก็แล้วแต่ หลัจากนั้นก็ก็ ขกทำเลยมาทำ order โดยไม่เพิ่งพา userId จาก authen อีกแล้ว
        ที่รู้ๆในตอนนี้คือ order สามารถสั่งชื้อได้แล้ว แต่ติดเรื่องของ userId นิดหน่อย โดยเราใส่เป็ฯเลข 1 ไปโดนต้องแก้ให้ตาม userId ของแต่ละผู้ใช้ ทีเ่หลือ put delete ยังไม่ได้ทำ และ หน้า ui ของ get ยังไม่ได้ทำ
        - ยังไม่ได้ทำ function สั่งชื้อ หรือ กูหาไม่เจอเอง ที่แน่ๆคือ หลังเล้นเกมเสร็จต้องตลวจให้หมดถึงจะนอนได้ และ เอาให้ชิว (ui cart)

        11:21:24 1:45 ง่วงมาก ทำ router ของ cart ไว้แล้ว พรุ่งนี้แยก order กับ cart ที่กูทำไว้ในวันนี้ดด้วย พังมากกกกกกก ตอนนี้ิดเรื่องของการเพิ่ม product ไปที่หน้า cart product หรือ ตระะกร้าสินค้า ว่าจะทำสำหรับ admin ด้วยเดะค่อยคิดต่อ

        11:22/24 1:14 ทำหน้า cart ไปเหมือนจะเส็จละ แต่พรุ่งนี้ต้องดูเองอี และ พรุ่งนี้ตรวจเรื่องของระบบต่างๆใน cart ด้วย และ ทำหน้า order สำหรับ user ตรง useer profile

        11:22:24 1:25 กลางวันนะ ทำ cart เสร็จละ แก้ตรง delete ละ
        เหลือทำหนา order

        11:23 ง่วงละ พรุ่งนี้ทำหน้า user profile ทั้งหมดด้วย ตอนนี้ทำหน้า wishlist และ api ละ พรุงนี้ก็ทำหน้า ui และ api ด้วย(ทั้งหมด)

          - 1:26 รอทำ user profile route ก่อน

          11:54 รอทำต่อกับ be (login register ทำ ui เสร็จละ)

        ตี 2 18 นาทีวันที่ 11/24/2024 ทำ signup เสร้ขแล้วรอเก็บรายละเอืยดพวก error ที่ส่งมาจาก be และ เอามาแสดงเป็นแจ้งเดือน และ พรุ่งนี้ทำ signin ด้วย และ ระบบ userId ที่เป็น 1 มาโดยตลอด

        11/25/24 พรุ่งนี้ design เพิ่มเหมือนจะไม่ค่อยมีระบบอะไรทำแล้วนะ ที่รู้ๆก็แค่ search sort ที่ต้องทำก็มี all product เกี่ยวกับเรา ติดต่อออกแบบให้ชื้อ logo profile เป็นตัวอักษรเริ่มต้นของชื่อ user และ เมื่อ group-hover ตรง cart-product ให้มันมี shadow หน่อยๆ
        และ ที่เป็ฯ optional ก็มี admin ต่างๆแต่อันนี้ไม่ต้องก็ได้ และ ที่สำคัญคือ responsive webdesign

        ต้องดูตอน login logout ด้วยแฮะ

        ปวดหัวกับการเพิิ่มสินค้าลงในรายการโปรดมาก ยังไม่เสร็จ ไปทำ reponseive ก่อน และ search ด้วย

        now 11/25/24 11:15 ว่าจะทำ responsive profile ให้เหมือนกับ https://www.mercular.com/ แต่ขอไปทำ search ก่อน

        11:55 รอทำ responsive profile ตามที่กล่าวไว่ข้างต้น และ ทำ search, all product, responsive profile menu, test ui more

        พรุ่งนี้ทำ search, all product, test ui more,

        พักสักสองวัน เดะมาทำต่อ

        ว่าจะเปลี่น design ของ cart อ่ะ ไปดูรูปเอาละกัน
ิ
        ติดปัณหาเรื่อง wishlist อีกละ pin สินค้าหลายอันไม่ได้
        ติดหน้า checkout ตรง list product และ หน้า admin order สำหรับ check และ test function ต่างๆเช่น
*/}