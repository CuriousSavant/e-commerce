import React from "react";
import HeroSection from "@/components/client/home/hero";
import LatestProduct from "@/components/client/home/latest-product";
import { BsCartX } from "react-icons/bs";
import prisma from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany()

  return (
    <div className="max-w-screen-xl mx-auto">
      <HeroSection />
      {products.length > 0 ? (
        <LatestProduct />
      ) : (
        <div className='flex flex-col justify-center items-center min-h-[600px]'>
          <BsCartX fontSize="10rem" color="#f1f2f3" />
          <h1 className='text-3xl font-semibold text-gray-400 mt-6'>ไม่มีสินค้า</h1>
        </div>
      )}
      {/* <CardCategorys /> */}
    </div>
  );
}