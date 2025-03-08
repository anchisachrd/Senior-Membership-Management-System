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
      <h1>Thank you for registering!</h1>
      <p>Dear ${candidateName},</p>
      <p>We have successfully received your registration.</p>
      <p>If your qualifications meet our requirements, we will contact you shortly.</p>
      <p>Thank you for your interest in joining us.</p>
      <p>Best regards,</p>
      <p>Senior Club Team</p>
    `;
  };
