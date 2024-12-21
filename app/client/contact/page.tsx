'use client'
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CiGlobe, CiInstagram, CiLocationOn, CiMail, CiPhone } from 'react-icons/ci';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2'
import writeFileSyncLib from '@/lib/read-file';
import Link from 'next/link';

const contactInfo = {
    address: "123/45 ถนนสุขสันต์ แขวงบางรัก เขตบางรัก กรุงเทพมหานคร 10500",
    phone: "+66 2 123 4567",
    email: "info@example.com",
    website: "https://next-portfolio-bay.vercel.app",
    instagram: "https://www.instagram.com/junior_dev175/",
};

const ContactPage = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const { data: session, status } = useSession()

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = [
            {
                id: session?.user.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                message: message,
                statusUser: status,
            }
        ]

        try {
            Swal.fire({
                icon: "success",
                title: "ส่งข้อความแล้ว🥳",
                text: "ขอบคุณสำหรับข้อความนะครับ ปัจจุบันผมยังไม่รับงานนะครับ ไว้มีโอกาสค่อยมาร่วมงานกันนะ🥰"
            })
            writeFileSyncLib('json/contact-msg.json', data)
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            console.error(err)
            Swal.fire({
                title: "เกิดข้อผิดพลาด 😢",
                text: "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองอีกครั้งในภายหลัง",
                icon: "error",
            });
        }
    }

    return (
        <div className='p-3 mt-20 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 border mb-2 rounded-md'>
                <h1 className='text-2xl font-semibold mb-6'>Contact Us</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl'>
                            <CiLocationOn />
                        </h1>
                        <h6>{contactInfo.address}
                            <p className='text-[#6b7280] text-sm'>ข้อมูลจำลอง</p>
                        </h6>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl'>
                            <CiPhone />
                        </h1>
                        <h6>{contactInfo.phone}
                            <p className='text-[#6b7280] text-sm'>ข้อมูลจำลอง</p>
                        </h6>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl'>
                            <CiMail />
                        </h1>
                        <h6>{contactInfo.email}
                            <p className='text-[#6b7280] text-sm'>ข้อมูลจำลอง</p>
                        </h6>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl'>
                            <CiGlobe />
                        </h1>
                        <Link href={contactInfo.instagram} className='hover:underline'>{contactInfo.website}</Link>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-2xl'>
                            <CiInstagram />
                        </h1>
                        <Link href={contactInfo.instagram} className='hover:underline'>{contactInfo.instagram}</Link>
                    </div>
                </div>
            </div>

            {/* form contact */}
            <div className='border p-4 rounded-md'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmitForm}>
                    <TextField
                        size='small'
                        label='first name'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />

                    <TextField
                        size='small'
                        label='last name'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                    />

                    <TextField
                        size='small'
                        label='email'
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        value={email}
                        required
                    />

                    <TextField
                        size='small'
                        label='type your message...'
                        rows={6} onChange={(e) => setMessage(e.target.value)}
                        multiline
                        value={message}
                        fullWidth
                    />
                    <div className='mt-2'>
                        <Button type='submit' variant='contained' fullWidth>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactPage;