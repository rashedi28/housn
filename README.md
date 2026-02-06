# حُسن - متجر التجميل

متجر إلكتروني عصري لمستحضرات التجميل والعناية مبني على Next.js 14+ مع TypeScript، Supabase، ودعم كامل للغة العربية والإنجليزية والوضع الداكن/الفاتح.

## الميزات

- 🌐 دعم متعدد اللغات (العربية والإنجليزية) مع RTL/LTR
- 🌓 وضع داكن ووضع فاتح
- 🎨 تصميم أنثوي أنيق بألوان ناعمة وباستيل (وردي، خوخي، لافندر)
- 📱 متجاوب مع جميع الأجهزة
- 🔐 لوحة إدارة محمية بـ Supabase Authentication
- 📦 إدارة كاملة للمنتجات والأقسام (CRUD)
- 🔍 بحث وتصفية حسب القسم
- ⚡ أداء عالي مع Next.js App Router
- ✨ تأثيرات زجاجية (Glassmorphism) محسّنة

## التقنيات المستخدمة

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Database & Authentication)
- **next-intl** (Internationalization)
- **next-themes** (Theme Management)
- **React Query** (Data Fetching)
- **Zod** (Validation)
- **React Hook Form** (Form Handling)

## الإعداد

### 1. تثبيت Dependencies

```bash
npm install
```

### 2. إعداد Supabase

1. أنشئ مشروع جديد في [Supabase](https://supabase.com)
2. انسخ `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. أنشئ ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. إنشاء الجداول

قم بتشغيل SQL script الموجود في `supabase/schema.sql` في Supabase SQL Editor.

### 4. إدراج البيانات الوهمية (اختياري)

```bash
npm run seed
```

سيتم إنشاء:
- 6 أقسام (العناية بالبشرة، المكياج، العناية بالشعر، العطور، العناية بالجسم، أدوات التجميل)
- 60 منتج تجميل (10 لكل قسم)

### 5. إنشاء حساب مستخدم (للوحة الإدارة)

1. افتح **Supabase Dashboard** → **Authentication** → **Users**
2. اضغط **Add user** → **Create new user**
3. أدخل:
   - **Email**: `admin@example.com` (أو أي بريد)
   - **Password**: كلمة مرور قوية (6 أحرف على الأقل)
   - **Auto Confirm User**: ✅ فعّل هذا الخيار
4. اضغط **Create user**

📖 للمزيد من التفاصيل، راجع [LOGIN_INSTRUCTIONS.md](./LOGIN_INSTRUCTIONS.md)

## التشغيل

```bash
# Development
npm run dev

# Build
npm run build

# Start Production
npm start
```

## البنية

```
gifts/
├── app/
│   └── [locale]/          # Pages with locale routing
│       ├── page.tsx       # Home page
│       ├── gifts/         # Products pages
│       ├── categories/    # Categories page
│       └── admin/         # Admin panel
├── components/
│   ├── ui/                # Reusable UI components
│   ├── gifts/             # Product components
│   ├── admin/             # Admin components
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase setup
│   ├── i18n/              # i18n configuration
│   └── utils/             # Utility functions
├── messages/              # Translation files
├── types/                 # TypeScript types
└── supabase/              # Database schema
```

## الصفحات

- `/` - الصفحة الرئيسية (Hero Section)
- `/gifts` - قائمة المنتجات
- `/gifts/[id]` - تفاصيل المنتج
- `/categories` - الأقسام
- `/admin` - لوحة الإدارة (يتطلب تسجيل الدخول)
- `/admin/gifts` - إدارة المنتجات
- `/admin/categories` - إدارة الأقسام
- `/admin/login` - تسجيل الدخول

## تسجيل الدخول

للوصول إلى لوحة الإدارة:

1. اذهب إلى `/ar/admin/login` أو `/en/admin/login`
2. أدخل البريد الإلكتروني وكلمة المرور التي أنشأتها في Supabase
3. بعد تسجيل الدخول، سيتم إعادة توجيهك إلى لوحة الإدارة

📖 للمزيد من التفاصيل، راجع [LOGIN_INSTRUCTIONS.md](./LOGIN_INSTRUCTIONS.md)

## التصميم

المتجر مصمم بألوان ناعمة وباستيل:
- **وردي ناعم**: للعناصر الأساسية
- **خوخي**: للعناصر الثانوية
- **لافندر**: للعناصر المميزة

التصميم أنثوي وأنيق مع تأثيرات زجاجية محسّنة.

## الترخيص

MIT
