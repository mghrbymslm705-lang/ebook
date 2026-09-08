'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/shared/BottomNav';
import Navbar from '@/components/shared/Navbar';
import { ThemeProvider } from 'next-themes';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [role, setRole] = useState<'supervisor' | 'teacher' | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.role) setRole(data.role);
        else router.push('/login');
      })
      .catch(() => router.push('/login'));
  }, []);

  if (!role) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar role={role} />
        <main className="flex-1 p-4 pb-20 max-w-7xl mx-auto w-full rtl">
          {children}
        </main>
        <BottomNav role={role} />
      </div>
    </ThemeProvider>
  );
}