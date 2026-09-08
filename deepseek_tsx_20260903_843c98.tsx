import { getServerSession } from '@/lib/auth'; // ستحتاج إلى تنفيذ جلسة من طرف الخادم، لكننا سنستخدم API
// في هذا المثال سنستخدم client-side fetching

'use client';
import { useEffect, useState } from 'react';
import StatsCards from '@/components/admin/StatsCards';
import RecentRecords from '@/components/admin/RecentRecords';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>
      <StatsCards stats={stats} />
      <RecentRecords />
    </div>
  );
}