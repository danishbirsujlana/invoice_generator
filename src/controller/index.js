const fs = require('fs');
const puppeteer = require('puppeteer');
const htmlContent = require('../templates/typeA')

const testFunc = async (req, res) => {
    console.log("ok")
    res.json({ message: 'Test successful' });
}

const generateTypeA = async (req, res) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    fs.writeFileSync('outputA.pdf', pdfBuffer);

    await browser.close();
    console.log('PDF generated successfully!');
    res.json({ message: 'Generated' });
}

module.exports = {
    testFunc,
    generateTypeA
}