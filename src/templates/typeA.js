const fs = require('fs');
// const imageBuffer = fs.readFileSync("");
// const base64Image = imageBuffer.toString('base64');

const setrRows = (items) => {
    let result = ``;
    items?.map((item) => {
        result += `<tr class="row-items">
        <td class="item">${item?.desc}</td>
        <td class="item">${item?.rate}</td>
        <td class="item">${item?.qty}</td>
        <td class="item">${item?.amount}</td>
    </tr>`
    })
    return result;
}

const htmlContentA = (data) => {
    return `
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
            padding: 10px;
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
            text-align: center;
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
            <img src="https://evergreenlandscapingca.com/wp-content/uploads/2016/01/egl-logo.png" alt="...">
        </div>
        <div id="ts2">
            <h2 class="ts-text">EverGreen Landscaping</h2>
            <h3 class="ts-text">123 Ladnscaping Dr</h3>
            <p class="ts-text">Big City, New York 11345</p>
            <p class="ts-text">invoices@eglandscaping.com</p>
        </div>
        <div id="ts3">
            <p class="ts-text ts-head">INVOICE</p>
            <p class="ts-text">${data?.invNo}</p>
            <p class="ts-text ts-head">DATE</p>
            <p class="ts-text">${data?.date}</p>
            <p class="ts-text ts-head">DUE</p>
            <p class="ts-text">${data?.due}</p>
            <p class="ts-text ts-head">BALANCE DUE</p>
            <p class="ts-text">${data?.balance}</p>
        </div>
    </div>

    <div style="margin: 15px 15px;">
        <p style="font-size: 12px; font-weight: bold; margin: 6px 0;">Bill To</p>
        <p class="ts-text">${data?.name}</p>
        <p class="ts-text">${data?.address}</p>
        <p class="ts-text">${data?.phNum}</p>
        <p class="ts-text">${data?.email}</p>
    </div>

    <div id="tables">
        <div id="table-content-upper">
            <table width="100%">
                <tr id="head-row">
                    <th class="item heading">DESCRIPTION</th>
                    <th class="item heading">RATE</th>
                    <th class="item heading">QTY</th>
                    <th class="item heading">AMOUNT</th>
                </tr>`
        + setrRows(data?.items) +
        `</table>
        </div>

        <div id="table-content-lower">
            <table width="100%">
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Sub Total</p>
                        <p>${data?.subTotal}</p>
                    </td>
                </tr>
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Tax (8%)</p>
                        <p>${data?.tax}</p>
                    </td>
                </tr>
                <tr class="row-items">
                    <td class="itemk">
                        <p style="flex: 1;">Total</p>
                        <p>${data?.total}</p>
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
            <p class="bottom-text">Phone Number: ${data?.senderPhNum}</p>
        </div>
        <div>
            <p class="bottom-text">email: ${data?.senderEmail}</p>
        </div>
    </div>
</body>

</html>
    `;
}

module.exports = htmlContentA;

{/* <img src="https://evergreenlandscapingca.com/wp-content/uploads/2016/01/egl-logo.png" alt="..."> */ }
{/* <tr class="row-items">
    <td class="item">Alfreds Futterkiste</td>
    <td class="item">Maria Anders</td>
    <td class="item">Germany</td>
    <td class="item">Germany</td>
</tr> */}