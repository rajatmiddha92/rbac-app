import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import "../App.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="login-title"
      >
        Login
      </Typography>
      {error && (
        <Alert severity="error" className="login-error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          className="login-button"
        >
          Login
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          className="login-register-link"
        >
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
