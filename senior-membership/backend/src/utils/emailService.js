import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'earn.anchisa27@gmail.com',
            pass: 'aspl ijit hysg yzqo'
        }
    }
);


   
export const sendEmail = async (recipientEmail, subject, htmlMessage) => {
    try {
        const mailOptions = {
            from: 'earn.anchisa27@gmail.com',
            to: recipientEmail,
            subject: subject,
            html: htmlMessage,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipientEmail}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

export const generatePasswordEmailTemplate = (recipientName, password) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background: #4caf50;
            color: #ffffff;
            padding: 15px 20px;
            text-align: center;
        }
        .email-body {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .email-footer {
            background: #f4f4f9;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
        .btn {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background: #4caf50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Welcome to Senior Club</h1>
        </div>
        <div class="email-body">
            <p>Hello <b>${recipientName}</b>,</p>
            <p>Your auto-generated password is:</p>
            <h2>${password}</h2>
            <p>Please log in to your account and change your password immediately for security reasons.</p>
            <a href="http://localhost:5173/login" class="btn">Login Now</a>
        </div>
        <div class="email-footer">
            <p>&copy; 2025 Senior Club. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;


export const generateConfirmationEmail = (candidateName) => {
    return `
      <h1>ลงทะเบียนชมรมผู้สูลอายุสำเร็จ</h1>
      <p>เรียนคุณ <b>${candidateName}</b>,</p>
      <p>เราขอแจ้งให้ทราบว่าเราได้รับข้อมูลการสมัครของคุณเรียบร้อยแล้ว</p>
      <p>หากคุณมีคุณสมบัติตรงตามข้อกำหนดของเรา ทางเราจะติดต่อกลับไป</p>
      <p>ขอขอบคุณที่ให้ความสนใจเข้าร่วมเป็นส่วนหนึ่งของเรา</p>
      <p>ด้วยความเคารพ,</p>
      <p>ชมรมผู้สูงอายุ</p>
    `;
};


export const generateFailVerificationEmail = (candidateName, reason, comments) => {
    return `
    <p>เรียน คุณ <b>${candidateName}</b>,</p>
    <p>ข้อมูลการสมัครสมาชิกชมรมผู้สูงอายุของคุณไม่ผ่านการตรวจสอบ เนื่องจากข้อมูล${reason}</p>
    <p><b>หมายเหตุจากเจ้าหน้าที่:</b> ${comments}</p>
    <p>กรุณาตรวจสอบและอัปโหลดเอกสารใหม่</p>
    <p>ด้วยความเคารพ,</p>
    <p>ชมรมผู้สูงอายุ</p>
    `;

};

export const generateRejectionEmail = (candidateName, reason) => {
    return `
    <p>เรียน คุณ <b>${candidateName}</b>,</p>
    <p>ขอแจ้งให้ทราบว่าการสมัครสมาชิกชมรมผู้สูงอายุของคุณ <b>ไม่ผ่านการอนุมัติ</b> เนื่องจาก ${reason}</p>
    <p>หากมีข้อสงสัย กรุณาติดต่อทางชมรมได้ที่เบอร์ 0988-822-2222</p>
    <p>ด้วยความเคารพ,</p>
    <p>ชมรมผู้สูงอายุ</p>
    `;
};

// #TODO ทำ email ต่อ
export const generateApprovalEmail = (candidateName) => {
    return `
    <p>เรียน คุณ <b>${candidateName}</b>,</p>
    <p>🎉 <b>ยินดีด้วย!</b> 🎉</p>
    <p>เราขอแจ้งให้ทราบว่าการสมัครสมาชิกชมรมผู้สูงอายุของคุณ <b>ได้รับการอนุมัติ</b> เรีบร้อยแล้ว</p>
    <p>คุณสามารถเข้าสู่ระบบเพื่อเริ่มต้นใช้งานได้ที่:</p>
    <p><a href="http://localhost:5173/login" class="btn">Login Now</a></p>
    <p>หากคุณมีคำถามเพิ่มเติม กรุณาติดต่อฝ่ายสนับสนุน</p>
    <p>ขอขอบคุณที่เข้าร่วมกับเรา</p>
    <p>ด้วยความเคารพ,</p>
    <p>ชมรมผู้สูงอายุ</p>
    `;
};

