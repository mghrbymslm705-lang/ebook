'use client';
import { useUser } from '@/hooks/useUser'; // لجلب اسم المستخدم الحالي

export default function WhatsAppButton() {
  const user = useUser(); // استدعاء API /me
  const phone = '00212605706006';
  const message = encodeURIComponent(
    `السلام عليكم ورحمة الله وبركاته،\nمعكم الأستاذ: ${user?.fullName || 'المعلم'}.\nالتواصل معكم بخصوص:\n............................`
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 text-white p-3 rounded-lg inline-block"
    >
      التواصل مع المشرف عبر واتساب
    </a>
  );
}