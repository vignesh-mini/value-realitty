// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Return original if invalid

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (e) {
    return dateString; // Return original on error
  }
};

const PrintPreview = ({ form, logo, type, receiptNumber }) => {
  // Calculate values for quotation
  let contentHtml = "";
  const formattedDate = formatDate(form.date);
  const formattedRegDate = formatDate(form.regDate);

  if (type === "Receipt") {
    contentHtml = `
      <div class="receipt-box">BOOKING RECEIPT - ${receiptNumber}</div>
      <div class="field"><div class="label">DATE</div><div class="value">${
        formattedDate || ""
      }</div></div>
      <div class="field"><div class="label">CLIENT NAME</div><div class="value">${
        form.clientName || ""
      }</div></div>
      <div class="field"><div class="label">CLIENT PHONE NUMBERS</div><div class="value">${
        form.clientPhone || ""
      }</div></div>
      <div class="field"><div class="label">CLIENT RESIDENTIAL ADDRESS</div><div class="value">${
        form.clientAddress || ""
      }</div></div>
      <div class="field"><div class="label">LAYOUT NAME & PLOT NO</div><div class="value">${
        form.layoutPlot || ""
      }</div></div>
      <div class="field"><div class="label">TOTAL SQ.FT & RATE PER SQ.FT</div><div class="value">${
        form.sqFt || ""
      } & ₹${form.rate || ""}</div></div>
      <div class="field"><div class="label">ADVANCE AMOUNT</div><div class="value">₹${
        form.advance || ""
      }</div></div>
      <div class="field"><div class="label">MODE OF PAYMENT</div><div class="value">${
        form.mode || ""
      }</div></div>
      <div class="field"><div class="label">APPROX. REGISTRATION DATE</div><div class="value">${
        formattedRegDate || ""
      }</div></div>
      <div class="field"><div class="label">LOAN / CASH</div><div class="value">${
        form.loanCash || ""
      }</div></div>
    `;
  } else if (type === "Quotation") {
    const plotSize = Number(form.plotSize);
    const rate = Number(form.ratePerSqFt);
    const guideLineAmount = Number(form.guideLineValue);
    const sellingPrice = Number(form.sellingPrice);
    const loanPercent = Number(form.loanPercentage);
    const actualPrice = plotSize * rate;
    const regCost = plotSize * guideLineAmount * 0.09 + 3000;
    const docCharges = Number(form.docCharges);
    const advance = Number(form.advance);
    const totalSellingPrice = plotSize * sellingPrice;
    const loanAmount = totalSellingPrice * (loanPercent / 100);
    const totalCost = actualPrice + regCost + docCharges;
    const balanceToBePaid = totalCost - loanAmount - advance;

    contentHtml = `
      <div class="field"><div class="label">PROJECT / LAYOUT NAME</div><div class="value">${
        form.projectName || ""
      }</div></div>
      <div class="field"><div class="label">PLOT NUMBER</div><div class="value">${
        form.plotNumber || ""
      }</div></div>
      <div class="field"><div class="label">PLOT SIZE (Sq.Ft)</div><div class="value">${
        plotSize || ""
      }</div></div>
      <div class="field"><div class="label">RATE PER Sq.Ft</div><div class="value">₹${
        rate || ""
      }</div></div>
      <div class="field"><div class="label">GUIDE LINE VALUE</div><div class="value">₹${
        guideLineAmount || ""
      }</div></div>
      <div class="field"><div class="label">ADVANCE PAID</div><div class="value">₹${
        advance || ""
      }</div></div>

      <div class="quote-section">
        <h4 style="margin: 20px 0 5px;">Quotation Breakdown:</h4>
        <table class="quote-table">
          <tr><th>Description</th><th>Amount (₹)</th></tr>
          <tr><td>Actual Price</td><td>${actualPrice.toLocaleString()}</td></tr>
          <tr><td>Registration Cost</td><td>${Math.round(
            regCost
          ).toLocaleString()}</td></tr>
          <tr><td>Documentation Charges</td><td>${docCharges.toLocaleString()}</td></tr>
          <tr><td><strong>Total Cost</strong></td><td><strong>${Math.round(
            totalCost
          ).toLocaleString()}</strong></td></tr>
          <tr><td>Loan Amount</td><td>${loanAmount.toLocaleString()}</td></tr>
          <tr><td>Advance Paid</td><td>${advance.toLocaleString()}</td></tr>
          <tr><td><strong>Balance to be Paid</strong></td><td><strong>${Math.round(
            balanceToBePaid
          ).toLocaleString()}</strong></td></tr>
        </table>
      </div>
    `;
  }

  const style = `
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #fff;
        padding: 20px;
        color: #000;
        margin: 0;
      }
      .container {
        border: 1px solid #000;
        padding: 12px;
      }
      .header {
        text-align: center;
        margin-bottom: 10px;
      }
      .logo {
        height: 120px;
        width: 120px;
      }
      .main-title {
        color: #000080;
        font-size: 24px;
        font-weight: bold;
        margin-top: 5px;
      }
      .tagline {
        font-size: 14px;
        font-weight: bold;
        margin: 2px 0;
      }
      .subheader {
        font-size: 11px;
        margin-top: 2px;
      }
      .receipt-box {
        background-color: #000;
        color: #fff;
        text-align: center;
        font-weight: bold;
        padding: 6px;
        margin: 10px 0;
        font-size: 14px;
      }
      .field {
        display: flex;
        margin-bottom: 10px;
        font-size: 12px;
      }
      .label {
        font-weight: bold;
        width: 200px;
      }
      .value {
        border-bottom: 1px dashed #000;
        min-height: 18px;
        padding: 2px 4px;
        flex: 1;
      }
      .footer {
        font-size: 12px;
        margin-top: 40px;
        text-align: center;
        border-top: 1px solid #000;
        padding-top: 10px;
      }
      .footer-icons {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        gap: 8px;
        align-items: center;
        font-size: 12px;
      }
      .quote-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        margin-top: 10px;
      }
      .quote-table th, .quote-table td {
        border: 1px solid #000;
        padding: 6px 8px;
        text-align: left;
      }
      .quote-table th {
        background-color: #f0f0f0;
      }
      .quote-section {
        margin-top: 20px;
      }
      .signature {
        margin-top: 40px;
        text-align: right;
      }
    </style>
  `;

  const commonHeader = `
    <div class="header">
      <img src="${logo}" class="logo" alt="Company Logo" />
      <div class="main-title">VALUE REALITTY</div>
      <div class="tagline">Residential | Commercial | Investment</div>
      <div class="subheader">
        K. Mahendran, Founder and Chairman <br/>
        Corporate Office: No.144, Bharatha Matha Street, East Tambaram, Chennai‑59
      </div>
    </div>
  `;

  const footer = `
    <div class="footer">
      <div>📧 valuereality@gmail.com | 🌐 www.valuereality.com</div>
      <div class="footer-icons">
        <img src="data:image/svg+xml;utf8,<svg fill='%230077F2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M279.14 288l14.22-92.66h-88.91V132.89c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0C141.09 0 89.5 54.42 89.5 153.31V195.3H0v92.66h89.5V512h107.78V288z'/></svg>" width="16" height="16" />
        Facebook &nbsp;
        <img src="data:image/svg+xml;utf8,<svg fill='%23E1306C' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7 0-39.6 32.1-71.7 71.7-71.7 39.6 0 71.7 32.1 71.7 71.7 0 39.6-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-.9-19.6-5.1-37-17.5-53.5-12.2-16.1-28.4-28.1-47.2-36.3-16.6-7.1-34.2-11-52.3-11.7-20.6-.9-82.4-1.1-110.3-1.1s-89.7.2-110.3 1.1c-18.1.7-35.7 4.6-52.3 11.7C43.4 70.4 27.2 82.4 15 98.5 2.6 115 .4 132.9-.5 152.5c-.9 20.6-1.1 82.4-1.1 110.3s.2 89.7 1.1 110.3c.9 19.6 5.1 37 17.5 53.5 12.2 16.1 28.4 28.1 47.2 36.3 16.6 7.1 34.2 11 52.3 11.7 20.6.9 82.4 1.1 110.3 1.1s89.7-.2 110.3-1.1c18.1-.7 35.7-4.6 52.3-11.7 18.8-8.2 35-20.2 47.2-36.3 12.4-16.5 16.6-33.9 17.5-53.5.9-20.6 1.1-82.4 1.1-110.3s-.2-89.7-1.1-110.3z'/></svg>" width="16" height="16" />
        Instagram &nbsp;
        <img src="data:image/svg+xml;utf8,<svg fill='%23000000' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M512 32L320 275.2 448 480H384L279.4 315.8 160 480H0L198.6 230.6 64 32H128L243.8 183.6 352 32z'/></svg>" width="16" height="16" />
        Twitter
      </div>
    </div>
  `;

  const html = `
    <html>
      <head>
        <title>${type === "Quotation" ? "Quotation" : "Receipt"}</title>
        ${style}
      </head>
      <body>
        <div class="container">
          ${commonHeader}
          ${contentHtml}
          <div class="signature">Signature: ________________</div>
          ${footer}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `;

  return html;
};

export default PrintPreview;
