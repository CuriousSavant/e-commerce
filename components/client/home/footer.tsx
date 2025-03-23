import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Grid */}
                {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <h1 className="flex justify-start text-2xl lg:text-3xl font-bold">
                            JUNIOR SHOP
                        </h1>
                        <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-left">
                            โปรเจดนี้ทำขึ้นมาเพื่อทดสอบสกิลของของผมเอง สินค้าในเว็บนี้ไม่มีจําหน่ายจริง
                            <a href="/client/about" className='ml-1 text-blue-500 underline'>อ่านเพิ่มเติม</a>
                        </p>
                        <a
                            href="/client/contact"
                            className="py-2.5 px-5 bg-[#0f63e9] rounded-full shadow-sm text-white mx-auto transition-all text-sm duration-500 hover:bg-indigo-700 lg:mx-0"
                        >
                            ติดต่อเรา
                        </a>
                    </div> */}
                    {/*End Col*/}
                    {/* <div className="lg:mx-auto text-left ">
                        <h4 className="text-lg text-gray-900 font-medium mb-7 uppercase">pages</h4>
                        <ul className="text-sm  transition-all duration-500">
                            <li className="mb-6">
                                <a
                                    href="/"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    หน้าแรก
                                </a>
                            </li>
                            <li className="mb-6">
                                <a
                                    href="/client/products"
                                    className=" text-gray-600 hover:text-blue-600"
                                >
                                    สินค้าทั้งหมด
                                </a>
                            </li>
                            <li className="mb-6">
                                <a
                                    href="/client/about"
                                    className=" text-gray-600 hover:text-blue-600"
                                >
                                    เกี่ยวกับเรา
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/client/contact"
                                    className=" text-gray-600 hover:text-blue-600"
                                >
                                    ติดต่อเรา
                                </a>
                            </li>
                        </ul>
                    </div> */}
                    {/*End Col*/}
                    {/* <div className="lg:mx-auto text-left">
                        <h4 className="text-lg font-medium mb-7 uppercase">Follow us</h4>
                        <ul className="text-sm  transition-all duration-500">
                            <li className="mb-6">
                                <a
                                    href="https://www.instagram.com/junior_dev175/"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li className="mb-6">
                                <a
                                    href="https://github.com/CuriousSavant"
                                    className=" text-gray-600 hover:text-blue-600"
                                >
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> */}
                {/*Grid*/}
                <div className="py-7 border-t border-gray-200">
                    <div className="flex items-center justify-center flex-col lg:flex-row">
                        <span className="text-sm text-gray-500 ">
                            ©<a href="/">junior shop</a> 2024, All rights
                            reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer