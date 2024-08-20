'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { MdEmail, MdMenu } from 'react-icons/md';
import { CONFIG } from '@/lib';
import { motion, AnimatePresence } from 'framer-motion';
import Highlight from './Highlight';

const NavLinks = [
  {
    name: 'home',
    href: '/',
    open: true,
  },
  {
    name: 'stack',
    href: '/stack',
    open: true,
  },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className='w-full'>
      <nav className='h-24 flex justify-between items-center'>
        <div className='flex items-center'>
          <h1
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex flex-row justify-center items-center text-white text-3xl mr-5"
          >
            <div className="hover:cursor-pointer">
              {CONFIG.NICKNAME}
            </div>
          </h1>
          <ul className='md:flex space-x-4 ml-12 hidden'>
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <span className='text-teal-500'>/</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='text-black'>
          <button className='bg-teal-500 text-lg p-2 smooth rounded-md font-semibold hidden md:flex items-center hover:bg-teal-600'>
            <MdEmail className='mr-2' />
            contact
          </button>
          <button
            className='block md:hidden bg-teal-500 p-2.5 rounded-md smooth hover:bg-teal-600'
            onClick={toggleDropdown}
          >
            <MdMenu />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isDropdownOpen && <MobileDropDown closeDropdown={toggleDropdown} />}
      </AnimatePresence>
    </div>
  );
};

const MobileDropDown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  return (
    <motion.div
      className="fixed top-20 w-screen px-10
      flex flex-col overflow-y-scroll
      bg-black shadow-epic-black-light shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {NavLinks.map((link, key) => {
        if (!link.open) return null;
        return (
          <div
            className="hover:cursor-pointer hover:bg-epic-black-light text-center py-2.5 rounded-md"
            onClick={() => {
              window.location.href = link.href;
              closeDropdown(); // Close dropdown after clicking link
            }}
            key={key}
          >
            <p className="text-white text-xl">
              <Highlight>/</Highlight>
              {link.name}
            </p>
          </div>
        );
      })}
      <motion.div
        className="hover:cursor-pointer bg-teal-500
        text-center text-xl py-2.5 rounded-md
        mt-2.5"
        whileHover={{
          y: -5,
        }}
        onClick={() => {
          window.location.href =
            '/'; // your email or more..
          closeDropdown(); // Close dgropdown after clicking link
        }}
      >
        <p className="text-epic-black">addyouemail@here.com</p>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;