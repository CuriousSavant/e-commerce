import React from 'react'
import { dummyjsonProps } from '@/types/dummyjson'

interface Props {
    allProducts: dummyjsonProps[];
}

const ThreeGridItem = ({
    item,
    size,
}: {
    item: dummyjsonProps,
    size: 'full' | 'half',
}) => {
    return (
        <div key={`${item.category}`} className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}>
            <a className="relative block aspect-square h-full w-full" href="#">
                <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 relative border-neutral-200">
                    <img
                        alt="Acme Circles T-Shirt"
                        decoding="async"
                        data-nimg="fill"
                        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                        sizes={size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                        src={item.thumbnail}
                        style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                    />
                    <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label lg:px-20 lg:pb-[35%]">
                        <div className="flex items-center rounded-full border bg-gray-200 p-1 text-xs text-black backdrop-blur-md">
                            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                                {item.title}
                            </h3>
                            <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                                {item.price}
                                <span className="ml-1 inline @[275px]/label:inline">
                                    USD
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

const Product: React.FC<Props> = ({ allProducts }) => {
    return (
        <>
            <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]" >
                {allProducts.slice(0, 3).map((item, index) => (
                    <ThreeGridItem
                        key={index}
                        item={item}
                        size={index === 0 ? 'full' : 'half'}
                    />
                ))}
            </section>
        </>
    )
}

export default Product;