import React from 'react'
import { Metadata } from 'next';
import SessionProvider from '@/app/context/sessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
    title: "Client Page",
};

const ClientLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)
    return (
        <SessionProvider session={session}>
            <main className='max-w-screen-xl mt-16 min-h-screen'>
                {children}
            </main>
        </SessionProvider>
    )
}

export default ClientLayout;