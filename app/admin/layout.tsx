import { Metadata } from 'next'
import AdminLayoutPage from './adminLayout';

export const metadata: Metadata = {
  title: "Admin Page"
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminLayoutPage>
        {children}
      </AdminLayoutPage>
    </>
  );
}