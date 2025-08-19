// src/components/BookingReceiptScreen.js
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
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Print as PrintIcon,
  ArrowBack as ArrowBackIcon,
  Payment as PaymentIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import backgroundImage from "../assets/BGMobile.png";
import logo from "../assets/logo.jpeg";
import printLogo from "../assets/print-logo.png";
import PrintPreview from "./utils/PrintWrapper";

const BookingReceiptScreen = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date(),
    clientName: "",
    clientPhone: "",
    clientAddress: "",
    layoutPlot: "",
    sqFt: "",
    rate: "",
    advance: "",
    mode: "",
    regDate: null,
    loanCash: "",
  });

  const navigate = useNavigate();

  // Payment mode options with icons
  const paymentModes = [
    { value: "Cash", icon: <PaymentIcon sx={{ color: "#2e7d32", mr: 1 }} /> },
    {
      value: "Cheque",
      icon: <AccountBalanceIcon sx={{ color: "#1976d2", mr: 1 }} />,
    },
    {
      value: "Bank Transfer",
      icon: <AccountBalanceIcon sx={{ color: "#1976d2", mr: 1 }} />,
    },
    {
      value: "Online Payment",
      icon: <PaymentIcon sx={{ color: "#d32f2f", mr: 1 }} />,
    },
    {
      value: "DD (Demand Draft)",
      icon: <AccountBalanceIcon sx={{ color: "#9c27b0", mr: 1 }} />,
    },
    { value: "UPI", icon: <PaymentIcon sx={{ color: "#ed6c02", mr: 1 }} /> },
  ];

  // Loan/Cash options
  const paymentTypes = [
    { value: "Loan", color: "#1976d2" },
    { value: "Cash", color: "#2e7d32" },
    { value: "Part Loan Part Cash", color: "#9c27b0" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile format
    return phoneRegex.test(number);
  };

  const isFormValid = () => {
    const allFilled = Object.values(formData).every((val) => val !== "");
    return allFilled && isValidPhoneNumber(formData.clientPhone);
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
      printLogo,
      type: "Receipt",
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          // Global styles to remove number input arrows
          "& input[type=number]": {
            "-moz-appearance": "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
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
                backgroundColor: "rgba(0, 0, 0, 0.25)",
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
                  Booking Receipt
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
                Fill in all the details below to generate a professional booking
                receipt. All fields are required to create the receipt document.
              </Typography>

              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={(newValue) => handleDateChange("date", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          style: {
                            borderRadius: "14px",
                            backgroundColor: "#f8f9fa",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Name"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Phone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Address"
                    name="clientAddress"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={2}
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Layout Plot"
                    name="layoutPlot"
                    value={formData.layoutPlot}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Square Feet"
                    name="sqFt"
                    value={formData.sqFt}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                      endAdornment: (
                        <InputAdornment position="end">sq.ft.</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Rate"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Advance"
                    name="advance"
                    value={formData.advance}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    InputProps={{
                      style: {
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                      },
                      endAdornment: (
                        <InputAdornment position="end">₹</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Enhanced Mode Dropdown */}
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      id="mode-label"
                      sx={{
                        fontWeight: 500,
                        color: "#5a6c7d",
                      }}
                    >
                      Payment Mode
                    </InputLabel>
                    <Select
                      labelId="mode-label"
                      label="Payment Mode"
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                        width: "160px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          padding: "14px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ced4da",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0e3559",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0e3559",
                          borderWidth: "2px",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "14px",
                            marginTop: "8px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      {paymentModes.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            py: 1.5,
                            borderRadius: "8px",
                            margin: "4px 8px",
                            "&:hover": {
                              backgroundColor: "rgba(14, 53, 89, 0.05)",
                            },
                          }}
                        >
                          {option.icon}
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Registration Date"
                    value={formData.regDate}
                    onChange={(newValue) =>
                      handleDateChange("regDate", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          style: {
                            borderRadius: "14px",
                            backgroundColor: "#f8f9fa",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Enhanced Loan/Cash Dropdown */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="loanCash-label"
                      sx={{
                        fontWeight: 500,
                        color: "#5a6c7d",
                      }}
                    >
                      Loan/Cash
                    </InputLabel>
                    <Select
                      labelId="loanCash-label"
                      label="Loan/Cash"
                      name="loanCash"
                      value={formData.loanCash}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        borderRadius: "14px",
                        backgroundColor: "#f8f9fa",
                        height: "56px",
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          padding: "14px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ced4da",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0e3559",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#0e3559",
                          borderWidth: "2px",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "14px",
                            marginTop: "8px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      {paymentTypes.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{
                            py: 1.5,
                            borderRadius: "8px",
                            margin: "4px 8px",
                            color: option.color,
                            fontWeight: 500,
                            "&:hover": {
                              backgroundColor: "rgba(14, 53, 89, 0.05)",
                            },
                          }}
                        >
                          {option.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
                      ? "Generate and print receipt as PDF"
                      : "Please fill all fields to enable printing"
                  }
                  arrow
                >
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<PrintIcon />}
                      disabled={!isFormValid() || isPrinting}
                      onClick={handlePrint}
                      sx={{
                        borderRadius: "14px",
                        backgroundColor: "#0e3559",
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                        minWidth: "180px",
                        boxShadow: "0 6px 12px rgba(14, 53, 89, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#226291",
                          transform: "translateY(-3px)",
                          boxShadow: "0 8px 18px rgba(14, 53, 89, 0.4)",
                        },
                        "&:disabled": {
                          backgroundColor: "#e0e0e0",
                          color: "#9e9e9e",
                          boxShadow: "none",
                          transform: "none",
                        },
                      }}
                    >
                      {isPrinting ? "Generating PDF..." : "Print Receipt"}
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
                    borderRadius: "12px",
                    padding: "12px",
                    maxWidth: "500px",
                    margin: "20px auto 0",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  Please complete all fields to enable the Print Receipt button.
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
            transition: "opacity 0.3s ease",
            "&:hover": {
              color: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          © {new Date().getFullYear()} Value Realitty. All rights reserved.
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingReceiptScreen;
