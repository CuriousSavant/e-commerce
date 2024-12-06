import React from 'react'
import { Metadata } from 'next';
import SessionProvider from '@/components/sessionProvider';
import { getServerSession } from 'next-auth';
import LayoutProduct from '@/components/layout/layout-product';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
    title: "Client Page",
};

const ClientLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions)
    return (
        <SessionProvider session={session}>
            <LayoutProduct>
                <main className='max-w-screen-xl'>
                    {children}
                </main>
            </LayoutProduct>
        </SessionProvider>
    )
}

export default ClientLayout;