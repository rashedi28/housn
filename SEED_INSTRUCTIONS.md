# تعليمات إنشاء البيانات الوهمية

## الطريقة 1: استخدام Service Role Key (موصى به)

1. اذهب إلى Supabase Dashboard
2. Settings → API
3. انسخ **service_role key** (⚠️ احذر: هذا المفتاح قوي، لا تشاركه أبداً!)
4. أضفه إلى `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

5. شغّل:
```bash
npm run seed
```

## الطريقة 2: تعديل السياسات في Supabase

إذا لم ترد استخدام service_role key، يمكنك تعديل السياسات في Supabase SQL Editor:

1. افتح Supabase Dashboard → SQL Editor
2. شغّل هذا SQL:

```sql
-- السماح بالإدراج بدون authentication (للتطوير فقط)
DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Gifts are insertable by authenticated users" ON gifts;

CREATE POLICY "Categories are insertable by anyone" ON categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Gifts are insertable by anyone" ON gifts
    FOR INSERT WITH CHECK (true);
```

⚠️ **تحذير**: هذه السياسات تسمح لأي شخص بالإدراج. استخدمها فقط للتطوير!

3. شغّل:
```bash
npm run seed
```

## الطريقة 3: إدراج البيانات يدوياً

يمكنك إدراج البيانات يدوياً من Supabase Dashboard → Table Editor.
