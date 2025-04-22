import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import "../App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await axios.post("https://rbac-app-mvkn.onrender.com/api/auth/register", {
        username,
        password,
        isAdmin,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container maxWidth="sm" className="register-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="register-title"
      >
        Register
      </Typography>
      {error && (
        <Alert severity="error" className="register-error">
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
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
            className="register-input"
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="register-checkbox"
            />
          }
          label="Register as Admin"
          className="form-group"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          className="register-button"
        >
          Register
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2 }}
          className="register-login-link"
        >
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </form>
    </Container>
  );
};

export default Register;
