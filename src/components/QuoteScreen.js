// src/components/QuoteScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Tooltip,
  LinearProgress,
  InputAdornment,
} from "@mui/material";
import {
  Print as PrintIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import backgroundImage from "../assets/BGMobile.png";
import logo from "../assets/logo.jpeg";
import PrintPreview from "./utils/PrintWrapper";

const QuoteScreen = () => {
  const navigate = useNavigate();
  const [isPrinting, setIsPrinting] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    plotNumber: "",
    plotSize: "",
    ratePerSqFt: "",
    guideLineValue: "",
    sellingPrice: "",
    loanPercentage: "",
    docCharges: "",
    advance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((val) => val !== "");
  };

  const getNextReceiptNumber = () => {
    const key = "lastReceiptNumber";
    const last = parseInt(localStorage.getItem(key) || "0", 10);
    const next = last + 1;
    localStorage.setItem(key, next.toString());
    return next;
  };

  const handlePrint = () => {
    setIsPrinting(true);
    const receiptNumber = getNextReceiptNumber();

    const printWindow = window.open("", "_blank");
    const html = PrintPreview({
      form: formData,
      logo,
      type: "Quotation",
      receiptNumber,
    });

    printWindow.document.write(html);
    printWindow.document.close();

    // Handle print completion
    printWindow.onload = () => {
      setIsPrinting(false);
    };
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(14, 53, 89, 0.92) 0%, rgba(34, 98, 145, 0.85) 100%)",
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          py: 4,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 2,
            color: "white",
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: "10px",
            px: 2,
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.25)",
            },
          }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            overflow: "visible",
            backgroundColor: "rgba(255, 255, 255, 0.97)",
          }}
        >
          {isPrinting && (
            <LinearProgress
              sx={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            />
          )}

          <CardContent sx={{ pt: isPrinting ? 0 : 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 4,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -70,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                  border: "4px solid #0e3559",
                }}
              >
                <img
                  src={logo}
                  alt="Value Realitty Logo"
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#0e3559",
                  fontWeight: 700,
                  textAlign: "center",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  mt: 5,
                }}
              >
                Project Quote Form
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: "#5a6c7d",
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto 30px",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              Fill in all the details below to generate a professional quote for
              your real estate project. All fields are required to create the
              quote document.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 2 }}>
              {Object.entries(formData).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        backgroundColor: "#f8f9fa",
                        fontSize: "1rem",
                      },
                      endAdornment: [
                        "plotSize",
                        "ratePerSqFt",
                        "guideLineValue",
                        "sellingPrice",
                        "loanPercentage",
                        "docCharges",
                        "advance",
                      ].includes(key) ? (
                        <InputAdornment position="end">
                          {key === "loanPercentage" ? "%" : "₹"}
                        </InputAdornment>
                      ) : null,
                    }}
                    InputLabelProps={{
                      style: {
                        fontWeight: 500,
                        color: "#5a6c7d",
                        fontSize: "1rem",
                      },
                    }}
                    type={
                      [
                        "plotSize",
                        "ratePerSqFt",
                        "guideLineValue",
                        "sellingPrice",
                        "loanPercentage",
                        "docCharges",
                        "advance",
                      ].includes(key)
                        ? "number"
                        : "text"
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ced4da",
                        },
                        "&:hover fieldset": {
                          borderColor: "#0e3559",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0e3559",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Tooltip
                title={
                  isFormValid()
                    ? "Generate and print quote as PDF"
                    : "Please fill all fields to enable printing"
                }
              >
                <span>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    disabled={!isFormValid() || isPrinting}
                    onClick={handlePrint}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#0e3559",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "1rem",
                      minWidth: "180px",
                      boxShadow: "0 4px 10px rgba(14, 53, 89, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#226291",
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 15px rgba(14, 53, 89, 0.4)",
                      },
                      "&:disabled": {
                        backgroundColor: "#e0e0e0",
                        color: "#9e9e9e",
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    {isPrinting ? "Generating PDF..." : "Print Quote"}
                  </Button>
                </span>
              </Tooltip>
            </Box>

            {!isFormValid() && (
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: "center",
                  color: "#d32f2f",
                  backgroundColor: "#ffebee",
                  borderRadius: "8px",
                  padding: "10px",
                  maxWidth: "500px",
                  margin: "20px auto 0",
                }}
              >
                Please complete all fields to enable the Print Quote button.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          color: "rgba(255, 255, 255, 0.7)",
          fontSize: "0.9rem",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Value Realitty. All rights reserved.
      </Box>
    </Box>
  );
};

export default QuoteScreen;
