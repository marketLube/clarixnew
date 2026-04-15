import nodemailer from 'nodemailer';
import { logger } from './logger.js';

export const sendOTP = async (to: string, otp: string) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_USER.includes('your-email')) {
            logger.warn('SMTP not configured. OTP email not sent.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });


        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject: 'Your Clarix Verification OTP',
            text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #513392; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Clarix Education</h1>
                    </div>
                    <div style="padding: 30px 20px; text-align: center; background-color: #ffffff;">
                        <h2 style="color: #162447; font-size: 22px; margin-bottom: 10px;">Verification Code</h2>
                        <p style="color: #767e92; font-size: 16px; margin-bottom: 30px;">Please use the following OTP to complete your verification process. This code will expire in 10 minutes.</p>
                        <div style="background-color: #f8f9fa; border: 1px solid #eaeaea; border-radius: 8px; padding: 15px; display: inline-block; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #513392;">
                            ${otp}
                        </div>
                        <p style="color: #767e92; font-size: 14px; margin-top: 30px;">If you didn't request this code, you can safely ignore this email.</p>
                    </div>
                    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #eaeaea;">
                        <p style="color: #a0a6b5; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Clarix Education. All rights reserved.</p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info(`OTP email sent to ${to}: ${info.messageId}`);
    } catch (error) {
        logger.error(`Error sending OTP email: ${error}`);
    }
};
