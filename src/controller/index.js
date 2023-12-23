const fs = require('fs');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const htmlContent = require('../templates/typeA')

const sendMail = async () => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        // secure: false,
        auth: {
            user: 'antonia.armstrong67@ethereal.email',
            pass: 'ApeeEum7QEbn71Bchh'
        },
    });
    const attachmentFilePath = 'outputA.pdf';
    const attachmentData = fs.readFileSync(attachmentFilePath);

    const mailOptions = {
        from: 'abc@gmail.com',
        to: 'def@gmail.com',
        subject: 'Sending Email with Attachment',
        text: 'Hello, this is a test email with an attachment.',
        attachments: [
            {
                filename: 'invoice.pdf',
                content: attachmentData,
            },
        ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const testFunc = async (req, res) => {
    console.log("ok")
    res.json({ message: 'Test successful' });
}

const generateTypeA = async (req, res) => {
    const data = req.body;

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(htmlContent(data), { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    fs.writeFileSync('outputA.pdf', pdfBuffer);

    await browser.close();

    if(req.body?.mail) await sendMail();

    console.log('PDF generated successfully!');
    res.json({ message: 'Generated' });
}

module.exports = {
    testFunc,
    generateTypeA
}