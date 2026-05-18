# YAZ Translate AI - Step 1 MVP

هذه نسخة تنفيذ أولى لتحويل الواجهات إلى تطبيق حقيقي قابل للتشغيل محليًا.

## ماذا تعمل هذه النسخة؟
- واجهة React/Vite عربية باتجاه RTL.
- دخول تجريبي.
- رفع فيديو إلى Backend.
- إنشاء مشروع داخل الاستوديو.
- محاكاة عملية التفريغ والترجمة.
- عرض النص العربي والإنجليزي في المحرر.
- تحميل ملف ترجمة SRT تجريبي.
- دعم الوضع الليلي/الفاتح.

> ملاحظة: هذه الخطوة لا تستخدم Whisper أو FFmpeg بعد. الهدف الآن بناء الهيكل وتشغيل الرحلة كاملة. في الخطوة 2 نضيف المعالجة الحقيقية.

## المتطلبات
- Node.js 18 أو أحدث
- Python 3.10 أو أحدث

## تشغيل Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## تشغيل Frontend
افتح Terminal جديد:
```bash
cd frontend
npm install
npm run dev
```

ثم افتح الرابط الذي يظهر عادة:
```txt
http://localhost:5173
```

## بيانات الدخول التجريبية
أي بريد وكلمة مرور تعمل في هذه النسخة.

## الخطوة التالية
بعد التأكد أن الرفع والتنقل يعملان، نضيف:
1. استخراج الصوت من الفيديو عبر FFmpeg.
2. التفريغ باستخدام Whisper/faster-whisper.
3. ترجمة النص.
4. توليد SRT حقيقي.
5. حرق الترجمة على الفيديو.
