'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/types/user'
import { Avatar, Typography } from '@mui/material'

const AdminUser = () => {
  const [adminUser, setAdminUser] = useState<User[]>([])

  useEffect(() => {
    axios.get('/api/users/')
      .then((res) => {
        const adminUsers = res.data.filter((user: { role: string }) => user.role === 'admin');
        setAdminUser(adminUsers);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
    <div className='flex flex-col p-4 gap-2'>
      <Typography variant='h5' fontWeight={600} py={2}>รายชื่อแอดมิน</Typography>
      {adminUser.map((user) => (
        <div className='border border-[#ddd] rounded-lg p-3'>
          <div className='flex items-center'>
            <Avatar>
              {user.name?.at(0)}
            </Avatar>
            <div className='ml-2'>
              <h1 className='font-semibold'>{user.name}</h1>
              <h1 className='text-neutral-500'>{user.email}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminUser