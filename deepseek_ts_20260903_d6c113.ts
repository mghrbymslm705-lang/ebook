import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'غير مسجل' }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: 'رمز غير صالح' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { teacher: true },
  });
  if (!user) return NextResponse.json({ error: 'مستخدم غير موجود' }, { status: 404 });

  return NextResponse.json({ id: user.id, username: user.username, role: user.role, fullName: user.fullName });
}