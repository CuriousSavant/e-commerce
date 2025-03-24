import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Product } from '@/types/product';
import React from 'react';

// from /client/[slug]/page.tsx
interface ImageSectionProps {
    product: Product;
    activeImage: number;
    setActiveImage: React.Dispatch<React.SetStateAction<number>>;
    handlePrev: () => void;
    handleNext: () => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
    product, activeImage, handleNext, handlePrev,
    setActiveImage,
}) => {
    return (
        <div className="relative rounded-lg">
            <img
                src={product.image?.[activeImage]}
                alt={product.title}
                className="h-auto md:h-[74vh] w-full object-cover bg-center"
            />

            {product.stock <= 0 && (
                <div className='h-[60vh] absolute inset-0 bg-black bg-opacity-65 flex items-center justify-center z-[999] rounded-lg'>
                    <span className="text-white text-lg font-semibold">สินค้าหมด</span>
                </div>
            )}

            {/* ปุ่มลูกศรซ้าย-ขวา */}
            <div className="absolute top-[40%] left-0 right-0 flex justify-between px-4 -translate-y-1/2">
                <IconButton
                    color="primary"
                    className="bg-white shadow-md"
                    onClick={handlePrev}
                >
                    <KeyboardArrowLeft className="text-lg" />
                </IconButton>
                <IconButton
                    color="primary"
                    className="bg-white shadow-md"
                    onClick={handleNext}
                >
                    <KeyboardArrowRight className="text-lg" />
                </IconButton>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.image?.map((img, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg border ${activeImage === index ? 'border-blue-500' : 'border-transparent'
                            } cursor-pointer`}
                        onClick={() => setActiveImage(index)}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageSection;