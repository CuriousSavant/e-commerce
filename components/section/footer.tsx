'use client'
import React from 'react'
import { BsGithub } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='text-sm md:text-base text-black h-16 flex justify-center items-center mb-16 md:mb-0'>
            <h1>© 2024 All rights reserved. |</h1>
            <a href='https://github.com/CuriousSavant' className='hover:underline mx-1'>View source</a> <BsGithub />
        </div>
    )
}

export default Footer