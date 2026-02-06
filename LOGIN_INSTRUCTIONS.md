# تعليمات تسجيل الدخول

## الطريقة 1: إنشاء حساب من Supabase Dashboard (الأسهل)

### الخطوة 1: إنشاء حساب مستخدم

1. افتح **Supabase Dashboard**
2. اذهب إلى **Authentication** → **Users**
3. اضغط على **Add user** → **Create new user**
4. أدخل:
   - **Email**: أي بريد إلكتروني (مثلاً: `admin@example.com`)
   - **Password**: كلمة مرور قوية (6 أحرف على الأقل)
   - **Auto Confirm User**: ✅ فعّل هذا الخيار (للتطوير)
5. اضغط **Create user**

### الخطوة 2: تسجيل الدخول

1. افتح المتصفح واذهب إلى:
   ```
   http://localhost:3000/ar/admin/login
   ```
   أو
   ```
   http://localhost:3000/en/admin/login
   ```

2. أدخل:
   - **البريد الإلكتروني**: البريد الذي أنشأته في Supabase
   - **كلمة المرور**: كلمة المرور التي حددتها

3. اضغط **تسجيل الدخول**

4. سيتم إعادة توجيهك تلقائياً إلى لوحة الإدارة

---

## الطريقة 2: إنشاء حساب من خلال SQL (للتطوير)

إذا أردت إنشاء حساب مباشرة من SQL:

1. افتح **Supabase Dashboard** → **SQL Editor**
2. شغّل هذا SQL (استبدل البريد وكلمة المرور):

```sql
-- إنشاء مستخدم جديد
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@example.com',  -- استبدل بالبريد الإلكتروني
  crypt('your_password_here', gen_salt('bf')),  -- استبدل بكلمة المرور
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

⚠️ **ملاحظة**: هذه الطريقة معقدة. استخدم الطريقة الأولى.

---

## معلومات تسجيل الدخول الافتراضية (للتطوير)

إذا أردت إنشاء حساب بسرعة، استخدم:

- **Email**: `admin@example.com`
- **Password**: `admin123` (أو أي كلمة مرور تريدها)

⚠️ **تحذير**: في الإنتاج، استخدم كلمة مرور قوية!

---

## استكشاف الأخطاء

### خطأ: "Invalid login credentials"
- تأكد من أن البريد الإلكتروني وكلمة المرور صحيحة
- تأكد من أن المستخدم موجود في Supabase Dashboard → Authentication → Users

### خطأ: "Email not confirmed"
- في Supabase Dashboard → Authentication → Users
- اضغط على المستخدم
- فعّل **Auto Confirm User** أو اضغط **Confirm User**

### لا يمكن الوصول إلى صفحة تسجيل الدخول
- تأكد من أن السيرفر يعمل: `npm run dev`
- تأكد من أن المسار صحيح: `/ar/admin/login` أو `/en/admin/login`

---

## بعد تسجيل الدخول

بعد تسجيل الدخول بنجاح، يمكنك:
- إدارة الهدايا: `/ar/admin/gifts`
- إدارة الفئات: `/ar/admin/categories`
- عرض لوحة الإدارة الرئيسية: `/ar/admin`
