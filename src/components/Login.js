// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Card,
  Typography,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import backgroundImage from "../assets/BGMobile.png";
import logo from "../assets/logo.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (username === "ValueRealitty" && password === "value!23") {
        navigate("/home");
        setError("");
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 1000);
  };

  console.log("username", username);
  console.log("password", password);
  console.log("error", error);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <Fade in={true} timeout={800}>
        <Card
          sx={{
            padding: { xs: 3, sm: 4 },
            width: { xs: "90%", sm: 400 },
            backgroundColor: "rgba(255, 255, 255, 0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            zIndex: 2,
            overflow: "visible",
            position: "relative",
          }}
        >
          {/* Floating Logo */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              width: 100,
              height: 100,
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
            gutterBottom
            align="center"
            sx={{
              color: "#0e3559",
              fontWeight: 700,
              letterSpacing: "1px",
              mt: 4,
              mb: 3,
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          ></Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "#5a6c7d",
              mb: 3,
              maxWidth: "80%",
            }}
          >
            Sign in to continue to Value Realitty
          </Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "14px",
                  backgroundColor: "#f8f9fa",
                  paddingLeft: 12,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#0e3559" }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  fontWeight: 500,
                  color: "#5a6c7d",
                },
              }}
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
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: "14px",
                  backgroundColor: "#f8f9fa",
                  paddingLeft: 12,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#0e3559" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#5a6c7d" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  fontWeight: 500,
                  color: "#5a6c7d",
                },
              }}
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
          </Box>

          {error && (
            <Fade in={Boolean(error)}>
              <Typography
                color="error"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#ffebee",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {error}
              </Typography>
            </Fade>
          )}

          <Button
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: "14px",
              backgroundColor: "#0e3559",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              textTransform: "none",
              boxShadow: "0 6px 12px rgba(14, 53, 89, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#226291",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(14, 53, 89, 0.4)",
              },
            }}
            onClick={handleLogin}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </Card>
      </Fade>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
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

export default Login;
