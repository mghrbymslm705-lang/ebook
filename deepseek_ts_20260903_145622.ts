import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      fullName: 'المشرف',
      password: hashPassword('admin123'),
      role: 'supervisor',
      isActive: true,
    },
  });
  console.log('Admin created:', admin);
}
main().catch(console.error);