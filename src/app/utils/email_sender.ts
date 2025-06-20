import nodemailer from 'nodemailer';
import configs from '../configs';

// Email template generator
const generateEmailTemplate = (bodyContent: string) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      	<h5>Dear,</h5>
      	
      <div style="font-size: 14px; line-height: 1.6;">
        ${bodyContent}
      </div>

      <br/>
      <br/>
      <img src="https://lh3.googleusercontent.com/a/ACg8ocJqRz5nt9BUM4yyelmKtSpCGJJjeqBurtopwyEhm3o0IzaEHY0=s288-c-no" alt="ReviewHub Logo" style="height: 50px;" />
      <p style="font-size: 14px;">Thanks,<br/><strong style="color: #04cd7e;">The Taskso Team</strong></p>

      <hr style="margin-top: 10px; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        This is an automated message from Taskso. Please do not reply.
      </p>
      <hr style="margin-top: 10px; border: none; border-top: 1px solid #ccc;" />
      <p style="text-align:center;font-size: 10px; color: #04cd7e;">Developed by- Md Abumahid Islam</p>
    </div>
</body>
  `;
};

// Main email sender function
export const EmailSender = async (
  to: string,
  subject: string,
  bodyContent: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: configs.email_sender.email,
      pass: configs.email_sender.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const html = generateEmailTemplate(bodyContent);

  const info = await transporter.sendMail({
    from: `"Taskso" <${configs.email_sender.email}>`,
    to,
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
};