# ระบบเครื่องซักผ้าหยอดเหรียญ

นี่คือระบบเว็บที่ใช้จัดการเครื่องซักผ้าหยอดเหรียญ โดยระบบนี้อนุญาตให้ผู้ใช้หยอดเหรียญ 10 บาทเพื่อเริ่มการทำงานของเครื่องซักผ้า และยังมีฟีเจอร์ส่งการแจ้งเตือนผ่าน LINE Notify เมื่อเครื่องซักผ้าพร้อมใช้งานภายในเวลาน้อยกว่า 1 นาที

## ฟีเจอร์
- รองรับเหรียญ 10 บาทเท่านั้น (กำหนดให้มีปุ่มเหรียญ10บาท อย่างเดียว)
- แสดงสถานะของการหยอดเหรียญ
- ส่งการแจ้งเตือนไปยังกลุ่ม LINE เมื่อเครื่องเหลือเวลา 1นาที
- ใช้ Node.js และ Express ในการพัฒนา Backend และใช้ HTML, CSS และ JavaScript สำหรับ Frontend

## ความต้องการของระบบ

- Node.js (>=14.x)
- Git (>=2.x)
- โทเค็นการเข้าถึงจาก LINE Notify
- การเชื่อมต่ออินเทอร์เน็ตสำหรับการส่งการแจ้งเตือน

## ขั้นตอนการติดตั้ง

1. **โคลนโปรเจคจาก GitHub:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd laundromat-system
    ```

2. **ติดตั้ง Dependencies ที่จำเป็น:**
    ```bash
    npm install
    ```

3. **ตั้งค่า LINE Notify:**
   - ไปที่ [LINE Notify](https://notify-bot.line.me/en/) และสร้างโทเค็นสำหรับกลุ่ม LINE ของคุณ (จะมีที่ให้ใส่Tokenจากไลน์)
   - แก้ไขโค้ดในไฟล์ `server.js` โดยใส่โทเค็นของคุณแทนที่:
     ```javascript
     const lineNotifyToken = 'YOUR_LINE_NOTIFY_TOKEN';
     ```

## การรันโปรเจค

1. **เริ่มต้นเซิร์ฟเวอร์ Backend:**
    ```bash
    node server.js
    ```

2. **เปิดหน้าเว็บ Frontend:**
   เปิดไฟล์ `index.html` ในเบราว์เซอร์ของคุณ

3. กรณีที่ ใช้Postmanทดสอบ
   ใช้ GET http://localhost:3000/api/machines เพื่อทดสอบว่ามีเครื่องซักผ้าเครื่องไหนทำงานหรือว่าง(ข้อมูลเบื้องต้น) ***ทดสอบในช่วงแรกๆ***
   ใช้ POST http://localhost:3000/api/notify/2 เพื่อทดสอบการส่งข้อความไปแจ้งเตือนในไลน์ 

## วิธีใช้งาน

- หยอดเหรียญ 10 บาท โดยคลิกที่ปุ่ม "Insert 10 Baht Coin" บนหน้าเว็บ
- สถานะจะแสดงจำนวนเหรียญที่หยอดแล้ว
- ระบบจะรีเซ็ตทุกครั้งหลังจากการใช้งานเสร็จสิ้น

  ## โครงสร้างไฟล์

```plaintext
.
├── app.js             # โค้ด Backend (Node.js, Express)
├── index.html         # หน้าเว็บ Frontend (แสดงผลหน้าเว็บ)
├── README.md          # ไฟล์นี้
└── package.json       # ข้อมูล dependencies ของโปรเจค
