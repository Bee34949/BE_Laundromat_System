// app.js
const express = require('express');
const app = express();
const axios = require('axios'); //เพิ่ม axios เพื่อส่งคำขอไปLine
const port = 3000;
const bodyParser = require('body-parser');


app.use(express.json());//รองรับ json
// ตั้งค่าให้สามารถอ่านไฟล์ HTML
app.use(express.static('public'));
//ส่ง Apiไป Line
const lineNotifyToken = 'rzXs3lS05TWcCybv5w1u06JsXVILG77be6Rsmph3kSQ';
function sendLineNotification(message) {
    axios.post('https://notify-api.line.me/api/notify', `message=${message}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${lineNotifyToken}`
        }
        
    
}).then(response => {
    console.log('Message sent to LINE:', response.data);//ส่งค่ากลับสำเร็จ
}).catch(err => {
    console.error('Error sent to LINE:', err);//ส่งค่ากลับไม่สำเร็จติดError
});
}




function startCountdown(machineId, minutes) {
    console.log(`Starting countdown for Machine ${machineId} with ${minutes} minutes`); //เรียกใช้ startCountdown

    const timerElement = document.getElementById(`timer${machineId}`); // ดึงค่า element ที่จะแสดงเวลา
    let timeLeft = minutes * 60; // แปลงนาทีเป็นวินาที


    const countdownInterval = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        console.log(`Machine ${machineId} - Time left: ${minutesLeft}m ${secondsLeft}s`);
        // ฟังก์ชันสำหรับขอสิทธิ์ในการแสดง Notification
        function requestNotificationPermission() {
            
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }
        }

        // เมื่อเหลือ 1 นาที ส่งการแจ้งเตือนไปยัง LINE Notify
        if (timeLeft === 60) {
            alert(`เครื่องซักผ้า ${machineId} จะเสร็จในอีก 1 นาที!`);
        }

        // เมื่อเวลาหมดลง
        if (timeLeft <= 0) {
            clearInterval(countdownInterval); // หยุดการถอยหลังเมื่อเวลาหมด
            console.log(`Machine ${machineId} has finished!`);
            // ส่งการแจ้งเตือนว่าเครื่องซักผ้าเสร็จสิ้น
            sendLineNotification(`เครื่องซักผ้า ${machineId} เสร็จสิ้นการทำงาน`);
        }

        timeLeft--; // ลดเวลาทุกวินาที
    }, 1000); // ทำงานทุก 1 วินาที
}
//IDเครื่องซักผ้า,สถานะ,เวลาเครื่องซักผ้าที่ใช้ได้ครั้งต่อไปที่เหลือ
let WashingMachines = 
[
    {IDMachine : 1 ,Status: 'available' ,TimeLeft:0},
    {IDMachine : 2 ,Status: 'inuse' ,TimeLeft:15},
    {IDMachine : 3 ,Status: 'available' ,TimeLeft:0},
    {IDMachine : 4 ,Status: 'inuse' ,TimeLeft:75}

];
app.get('/api/machines', (req, res) => {  // Api ที่ใช้ในการGETข้อมูล
    res.json(WashingMachines)}
);

{

let coinTotal = 0; // ตัวแปรสำหรับเก็บจำนวนเหรียญที่ใส่


// เรียกใช้ฟังก์ชัน insertCoin
function Insertcoin(coin_Value){
if (coin_Value === 10){ //ตรวจสอบเหรียญ 10 บาท
    coinTotal += coin_Value;
    console.log(`Insertcoin: ${coin_Value} Baht`);
}else{
    console.log("coin is invalid. Please Insert 10Baht coin.");//เหรียญไม่ใช่เหรียญ10บาท ต้องใส่เหรียญ10บาท
}
        }
    }
    //ตรวจสอบเหรียญที่ใส่
    function CheckCoin(req, res) {
        if (coinTotal = 10) { //ใช้เหรียญ10บาทเพื่อใช้เครื่องซักผ้า
            console.log("Machine is active. Start the washing."); // แจ้งเตือนว่าเครื่องซักผ้ากำลังจะเริ่มทำงาน
            startWashingMachine(); // เริ่มการทำงานของเครื่องซักผ้า
            coinTotal = 0; // รีเซ็ตจำนวนเหรียญหลังจากการเริ่มซัก
            res.json({ Message: ' machine started!!!', Status: 'success' });// เครื่องซักเริ่มทำงาน
        } else {
            res.json({ Message: `You have inserted ${coinTotal} Baht. Please insert more coins.`, Status: 'pending' });
        }
    }
    

//เริมการซักผ้า
function startWashingMachine() {
    console.log("Washing machine is now running.");
}


app.post('/api/Putcoin/:machineId', (req, res) => {
    const machineId = req.params.machineId;  // รับ machineId จาก URL
    console.log(`Machine ID: ${machineId}`); // แสดง machineId ใน console เพื่อดูการแสดงผล

    if (machineId < 1 || machineId > 4) {
        return res.status(400).json({ message: "Not have Machine ID. Please use a machine ID between 1 and 4." });
    }

    const coinValue = req.body.coinValue;  // เปลี่ยนเป็น req.body.coinValue ให้ตรงกับข้อมูลที่ส่งจาก Postman
    if (coinValue) {
        Insertcoin(coinValue);  // เรียกใช้ฟังก์ชัน Insertcoin
        CheckCoin(req, res);  // เรียกใช้ฟังก์ชัน CheckCoin
    } else {
        res.status(400).json({ message: "Coin value not provided." }); // Error ค่าเหรียญไม่ได้จัดให้มี
    }
});

// ฟังก์ชันสำหรับใส่เหรียญและเริ่มการถอยหลังสำหรับเครื่องซักผ้า
function insertCoin(coinValue, machineId) {
    // แสดงสถานะเริ่มทำงาน
    document.getElementById(`status${machineId}`).textContent = "Status: In Use";
    
    // เริ่มการถอยหลัง
    startCountdown(machineId, 1.2); //1 หน่วย คือ 1นาที
}

// ฟังก์ชันเริ่มการถอยหลัง *ใช้หน่วยเป็นวินาที*
function startCountdown(machineId, minutes) {
    const timerElement = document.getElementById(`timer${machineId}`); // ดึงค่า element ที่จะแสดงเวลา
    let timeLeft = minutes * 60; // แปลงนาทีเป็นวินาที

    
    const countdownInterval = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        // แสดงเวลาถอยหลังบนหน้าเว็บ
        timerElement.textContent = `Time left: ${minutesLeft}m ${secondsLeft}s`;

        // เมื่อเหลือ 1 นาที ส่งการแจ้งเตือน
        if (timeLeft === 60) {
            sendLineNotification(machineId);
        }

        if (timeLeft <= 0) { // เวลาหมดลง
            clearInterval(countdownInterval); // หยุดการถอยหลังเมื่อเวลาหมด
            timerElement.textContent = "Finished!"; // แสดงข้อความเสร็จสิ้น
            document.getElementById(`status${machineId}`).textContent = "Status: Available";
        }
        console.log(`Machine ${machineId} - Time left: ${minutesLeft}m ${secondsLeft}s`); // ตรวจสอบเวลาถอยหลัง
        timeLeft--; // ลดเวลาทุกวินาที
    }, 1000); // ทำงานทุก 1 วินาที
    async function sendNotification(machineId) {
        const response = await fetch(`/api/notify/${machineId}`, {
            method: 'POST',
        });
        if (response.ok) {
            console.log(`Notification sent for machine ${machineId}`);
        } else {
            console.error('Failed to send notification');
        }
    }
    
}



// สร้างเส้นทางหลัก (Route) สำหรับหน้าเว็บ
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//ทดสอบว่าในlineขึ้นแจ้งเตือนไหม

app.post('/api/notify/:machineId', (req, res) => {
    const machineId = req.params.machineId;
    sendLineNotification(`เครื่องซักผ้า ${machineId} กำลังจะเสร็จในอีก 1 นาที!`);
    res.json({ message: `Notification sent for machine ${machineId}` });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

