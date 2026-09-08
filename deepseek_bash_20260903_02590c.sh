# إنشاء مشروع جديد
npx create-next-app@latest quranic-kuttab --typescript --tailwind --eslint --app
cd quranic-kuttab

# تثبيت الاعتماديات
npm install prisma @prisma/client bcryptjs jsonwebtoken next-pwa next-themes lucide-react
npm install -D @types/bcryptjs @types/jsonwebtoken

# إنشاء ملفات prisma ونسخ السكيما أعلاه
npx prisma init

# ثم قم بتعديل .env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"

# إنشاء قاعدة البيانات
npx prisma migrate dev --name init

# تشغيل التطوير
npm run dev