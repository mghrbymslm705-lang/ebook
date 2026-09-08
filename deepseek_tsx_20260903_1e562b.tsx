'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BookOpen, ClipboardList, Settings, User, Circle, Calendar } from 'lucide-react';

interface Props {
  role: 'supervisor' | 'teacher';
}

export default function BottomNav({ role }: Props) {
  const path = usePathname();

  const adminLinks = [
    { href: '/admin', icon: Home, label: 'الرئيسية' },
    { href: '/admin/students', icon: Users, label: 'الطلاب' },
    { href: '/admin/circles', icon: BookOpen, label: 'الحلقات' },
    { href: '/admin/daily-data', icon: ClipboardList, label: 'البيانات' },
    { href: '/admin/settings', icon: Settings, label: 'المزيد' },
  ];

  const teacherLinks = [
    { href: '/teacher', icon: Home, label: 'الرئيسية' },
    { href: '/teacher/my-circles', icon: Circle, label: 'حلقاتي' },
    { href: '/teacher/my-students', icon: Users, label: 'طلابي' },
    { href: '/teacher/daily-log', icon: Calendar, label: 'السجل اليومي' },
    { href: '/teacher/settings', icon: Settings, label: 'المزيد' },
  ];

  const links = role === 'supervisor' ? adminLinks : teacherLinks;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center h-16 px-2 z-50">
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = path === href || path.startsWith(href + '/');
        return (
          <Link key={href} href={href} className={`flex flex-col items-center text-xs ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}