-- سياسات مؤقتة للسماح بالإدراج بدون authentication (للتطوير فقط)
-- ⚠️ تحذير: لا تستخدم هذه السياسات في الإنتاج!

-- حذف السياسات القديمة
DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON categories;

DROP POLICY IF EXISTS "Gifts are insertable by authenticated users" ON gifts;
DROP POLICY IF EXISTS "Gifts are updatable by authenticated users" ON gifts;
DROP POLICY IF EXISTS "Gifts are deletable by authenticated users" ON gifts;

-- إنشاء سياسات جديدة تسمح بالإدراج بدون authentication (للتطوير)
CREATE POLICY "Categories are insertable by anyone" ON categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Categories are updatable by anyone" ON categories
    FOR UPDATE USING (true);

CREATE POLICY "Categories are deletable by anyone" ON categories
    FOR DELETE USING (true);

CREATE POLICY "Gifts are insertable by anyone" ON gifts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Gifts are updatable by anyone" ON gifts
    FOR UPDATE USING (true);

CREATE POLICY "Gifts are deletable by anyone" ON gifts
    FOR DELETE USING (true);
