import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const studentsCount = await prisma.student.count();
  const teachersCount = await prisma.teacher.count();
  const circlesCount = await prisma.circle.count();
  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dailyRecords = await prisma.dailyRecord.findMany({
    where: { date: { gte: today, lt: tomorrow } },
  });
  const present = dailyRecords.filter(r => r.attendance === 'on_time').length;
  const absent = dailyRecords.filter(r => r.attendance === 'not_on_time').length;
  const recited = dailyRecords.filter(r => r.recitation === 'recited').length;
  const reviewed = dailyRecords.filter(r => r.review === 'reviewed').length;

  return NextResponse.json({
    students: studentsCount,
    teachers: teachersCount,
    circles: circlesCount,
    present,
    absent,
    recited,
    reviewed,
  });
}