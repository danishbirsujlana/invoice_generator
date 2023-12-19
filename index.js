const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Type A</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            height: 100vh;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
        }

        #top {
            height: 30px;
            background-color: green;
        }

        #top-section {
            display: flex;
            background-color: #ebffeb;
            align-items: center;
        }

        #ts2 {
            flex: 1;
        }

        h1,
        h2,
        p {
            font-family: Arial, sans-serif;
        }

        #head-row {
            background-color: green;
        }

        .row-items {
            background-color: #ebffeb;
        }

        .item {
            padding: 5px;
        }

        .heading {
            color: #fff;
        }

        #table-content-lower {
            margin-top: 25px;
        }

        .itemk {
            display: flex;
            padding: 5px 10px;
        }

        #tables {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 10px;
        }

        #footer {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
        }

        .bottom-text {
            font-weight: bold;
            font-size: 18px;
        }

        .ts-text {
            margin-top: 5px;
        }

        .ts-head {
            font-weight: 600;
            margin-bottom: 5px;
        }
    </style>
</head>

<body>
    <div id="top"></div>
    <div id="top-section">
        <div id="ts1">
            <img src="./R.png" alt="...">
        </div>
        <div id="ts2">
            <h2 class="ts-text">EverGreen Landscaping</h2>
            <h3 class="ts-text">123 Ladnscaping Dr</h3>
            <p class="ts-text">Big City, New York 11345</p>
            <p class="ts-text">invoices@eglandscaping.com</p>
        </div>
        <div id="ts3">
            <p class="ts-text ts-head">INVOICE</p>
            <p class="ts-text">{inv no.}</p>
            <p class="ts-text ts-head">DATE</p>
            <p class="ts-text">{DATE}</p>
            <p class="ts-text ts-head">DUE</p>
            <p class="ts-text">{DUE DATE}</p>
            <p class="ts-text ts-head">BALANCE DUE</p>
            <p class="ts-text">{BD}</p>
        </div>
    </div>

    <div style="margin: 15px 10px;">
        <p style="font-size: 12px; font-weight: bold; margin: 6px 0;">Bill To</p>
        <p class="ts-text">{Name}</p>
        <p class="ts-text">{address}</p>
        <p class="ts-text">{ph num}</p>
        <p class="ts-text">{email}</p>
    </div>

    <div id="tables">
        <div id="table-content-upper">
            <table width="100%">
                <tr id="head-row">
                    <th class="item heading">DESCRIPTION</th>
                    <th class="item heading">RATE</th>
                    <th class="item heading">QTY</th>
                    <th class="item heading">AMOUNT</th>
                </tr>
                <tr class="row-items">
                    <td class="item">Alfreds Futterkiste</td>
                    <td class="item">Maria Anders</td>
                    <td class="item">Germany</td>
                    <td class="item">Germany</td>
                </tr>
                <tr class="row-items">
                    <td class="item">Centro comercial Moctezuma</td>
                    <td class="item">Francisco Chang</td>
                    <td class="item">Mexico</td>
                    <td class="item">Mexico</td>
                </tr>
            </table>
        </div>

        <div id="table-content-lower">
            <table width="100%">
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Sub Total</p>
                        <p>100</p>
                    </td>
                </tr>
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Tax (8%)</p>
                        <p>100</p>
                    </td>
                </tr>
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Total</p>
                        <p>100</p>
                    </td>
                </tr>
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Balance Due</p>
                        <p>100</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div id="footer">
        <div>
            <p class="bottom-text">Sign</p>
        </div>
        <div>
            <p class="bottom-text">Phone Number: 9501622531</p>
        </div>
        <div>
            <p class="bottom-text">email: email@jefej8.409</p>
        </div>
    </div>
</body>

</html>
    `;

// const htmlContent = `
//       <html>
//         <head>
//           <title>Your PDF Title</title>
//         </head>
//         <body>
//           <h1>Hello, World!</h1>
//           <!-- Add your HTML content here -->
//         </body>
//       </html>
//     `;

const func = async (req, res) => {
    // return console.log("got inside")
    // Launch a headless browser
    const browser = await puppeteer.launch();

    // Open a new page
    const page = await browser.newPage();

    // Set the content of the page to your HTML
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Generate PDF from the page
    const pdfBuffer = await page.pdf({
        format: 'A4', // You can change the page format
        printBackground: true,
    });

    // Save the PDF to a file
    const fs = require('fs');
    fs.writeFileSync('output.pdf', pdfBuffer);

    // Close the browser
    await browser.close();
    console.log('PDF generated successfully!');

    res.json({ message: 'Generated' });
}

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// POST endpoint
app.post('/api/post', (req, res) => {
    // Access the data sent in the request body
    //   const requestData = req.body;

    // Your logic to handle the POST data
    // For now, just send back the received data
    console.log("ok")
    res.json({ message: 'Data received successfully' });
});

app.post('/api/generate', func);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});