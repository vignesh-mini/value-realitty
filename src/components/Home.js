// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import backgroundImage from "../assets/BGMobile.png";
import logo from "../assets/logo.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(245, 245, 245, 0.92) 0%, rgba(66, 160, 232, 0.85) 100%)",
          zIndex: 1,
        },
      }}
    >
      {/* Back to Login Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/login")}
        sx={{
          position: "absolute",
          top: { xs: 15, sm: 20 },
          left: { xs: 10, sm: 20 },
          color: "white",
          zIndex: 222,
          backgroundColor: "#150505ff",
          borderRadius: "10px",
          px: 2,
          py: 1,
          fontSize: { xs: "0.8rem", sm: "1rem" },
          "&:hover": {
            backgroundColor: "#ffead9",
            color: "black",
          },
        }}
      >
        Back to Login
      </Button>

      {/* Responsive Logo - Positioned Lower */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 222,
          mb: { xs: -5, sm: -5 },
          mt: { xs: 12, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { xs: 70, sm: 80 },
            height: { xs: 70, sm: 80 },
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
      </Box>

      <Fade in={true} timeout={800}>
        <Card
          sx={{
            padding: { xs: 2, sm: 4 },
            width: { xs: "90%", sm: 500 },
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            zIndex: 2,
            textAlign: "center",
            position: "relative",
            overflow: "visible",
            mb: { xs: 4, sm: 0 },
          }}
        >
          <CardContent>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                color: "#0e3559",
                fontWeight: 700,
                letterSpacing: "1px",
                mb: 2,
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Value Realitty
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#5a6c7d",
                mb: 4,
                maxWidth: "80%",
                margin: "0 auto",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Your trusted partner in real estate solutions
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: "14px",
                  backgroundColor: "#11aae2",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  letterSpacing: "0.5px",
                  textTransform: "none",
                  boxShadow: "0 6px 12px rgba(14, 53, 89, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#0d2a3eff",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(14, 53, 89, 0.4)",
                  },
                }}
                onClick={() => navigate("/quote")}
              >
                Get Quote
              </Button>

              <Button
                variant="contained"
                size="large"
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: "14px",
                  backgroundColor: "#313539",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  letterSpacing: "0.5px",
                  textTransform: "none",
                  boxShadow: "0 6px 12px rgba(46, 125, 50, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#150505ff",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(46, 125, 50, 0.4)",
                  },
                }}
                onClick={() => navigate("/booking-receipt")}
              >
                Booking Receipt
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      <Box
        sx={{
          position: "absolute",
          bottom: 10,
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

export default Home;
