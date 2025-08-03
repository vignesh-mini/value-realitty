// src/components/PrintableDocument.js
import React, { forwardRef } from "react";
import logo from "../../assets/logo.jpeg";

const PrintableDocument = forwardRef(({ data, title, type }, ref) => {
  const currentDate = new Date();

  console.log("data print", data);

  // Format currency values
  const formatCurrency = (value) => {
    if (isNaN(parseFloat(value))) return value;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage values
  const formatPercentage = (value) => {
    if (isNaN(parseFloat(value))) return value;
    return `${parseFloat(value).toFixed(2)}%`;
  };

  return (
    <div
      ref={ref}
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        border: "1px solid #ddd",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          borderBottom: "2px solid #0e3559",
          paddingBottom: "20px",
        }}
      >
        <img
          src={logo}
          alt="Value Realitty Logo"
          style={{
            width: "100px",
            height: "100px",
            marginRight: "25px",
            borderRadius: "8px",
          }}
        />
        <div>
          <h1
            style={{
              color: "#0e3559",
              margin: 0,
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Value Realitty
          </h1>
          <p
            style={{
              color: "#5a6c7d",
              margin: "8px 0 0",
              fontSize: "18px",
            }}
          >
            Real Estate Solutions & Property Management
          </p>
        </div>
      </div>

      {/* Document Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "15px",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
          borderLeft: "4px solid #0e3559",
        }}
      >
        <h2
          style={{
            color: "#0e3559",
            margin: "10px 0",
            fontSize: "26px",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: "#5a6c7d",
            margin: "5px 0",
            fontSize: "16px",
          }}
        >
          Official Document
        </p>
      </div>

      {/* Quote Document Content */}
      {type === "quote" && (
        <>
          <div
            style={{
              marginBottom: "40px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                color: "#0e3559",
                borderBottom: "2px solid #e0e0e0",
                paddingBottom: "10px",
                marginBottom: "20px",
                fontSize: "22px",
              }}
            >
              Project Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                fontSize: "16px",
              }}
            >
              <div>
                <strong style={{ color: "#5a6c7d" }}>Project Name:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.projectName}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Plot Number:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.plotNumber}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Plot Size:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.plotSize} sq.ft.
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Rate per Sq.Ft:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.ratePerSqFt)}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: "40px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                color: "#0e3559",
                borderBottom: "2px solid #e0e0e0",
                paddingBottom: "10px",
                marginBottom: "20px",
                fontSize: "22px",
              }}
            >
              Financial Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                fontSize: "16px",
              }}
            >
              <div>
                <strong style={{ color: "#5a6c7d" }}>Guide Line Value:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.guideLineValue)}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Selling Price:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.sellingPrice)}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Loan Percentage:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatPercentage(data.loanPercentage)}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>
                  Documentation Charges:
                </strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.docCharges)}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Advance Payment:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.advance)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Booking Receipt Document Content */}
      {type === "booking" && (
        <>
          <div
            style={{
              marginBottom: "40px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                color: "#0e3559",
                borderBottom: "2px solid #e0e0e0",
                paddingBottom: "10px",
                marginBottom: "20px",
                fontSize: "22px",
              }}
            >
              Client Information
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                fontSize: "16px",
              }}
            >
              <div>
                <strong style={{ color: "#5a6c7d" }}>Client Name:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.clientName}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Client Phone:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.clientPhone}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Date:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.date}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Registration Date:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.regDate}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Client Address:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.clientAddress}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: "40px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                color: "#0e3559",
                borderBottom: "2px solid #e0e0e0",
                paddingBottom: "10px",
                marginBottom: "20px",
                fontSize: "22px",
              }}
            >
              Property Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                fontSize: "16px",
              }}
            >
              <div>
                <strong style={{ color: "#5a6c7d" }}>Layout Plot:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.layoutPlot}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Square Feet:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.sqFt} sq.ft.
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Rate:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.rate)}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Mode of Payment:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.mode}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Loan/Cash:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {data.loanCash}
                </div>
              </div>
              <div>
                <strong style={{ color: "#5a6c7d" }}>Advance:</strong>
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                  {formatCurrency(data.advance)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: "40px",
          borderTop: "2px solid #0e3559",
          paddingTop: "25px",
          textAlign: "center",
          color: "#5a6c7d",
        }}
      >
        <p style={{ marginBottom: "5px" }}>
          <strong>Generated on:</strong>{" "}
          {currentDate.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>This is an official document from Value Realitty</strong>
        </p>
        <p
          style={{
            marginTop: "20px",
            paddingTop: "15px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          Value Realitty © {currentDate.getFullYear()} | www.valuerealitty.com |
          contact@valuerealitty.com | +91 98765 43210
        </p>
      </div>
    </div>
  );
});

export default PrintableDocument;
