import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import "../../App.css";

const permissionsList = [
  "read:users",
  "create:users",
  "update:users",
  "delete:users",
  "read:products",
  "create:products",
  "update:products",
  "delete:products",
]; // Example permissions

const CreateRole = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPermissions(event.target.value as string[]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await axios.post(
        "https://rbac-app-mvkn.onrender.com/api/roles/create",
        { name, permissions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(response.data.message);
      setName("");
      setPermissions([]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container maxWidth="sm" className="create-role-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="create-role-title"
      >
        Create Role
      </Typography>
      {error && (
        <Alert severity="error" className="create-role-error">
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" className="create-role-success">
          {successMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="create-role-form">
        <div>
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="create-role-input"
          />
        </div>
        <FormControl fullWidth margin="normal" className="form-group">
          <InputLabel
            id="permissions-multiple-checkbox-label"
            className="create-role-label"
          >
            Permissions
          </InputLabel>
          <Select
            labelId="permissions-multiple-checkbox-label"
            id="permissions-multiple-checkbox"
            multiple
            value={permissions}
            onChange={handleChange}
            input={
              <OutlinedInput
                label="Permissions"
                className="create-role-select-input"
              />
            }
            renderValue={(selected) => selected.join(", ")}
            className="create-role-select"
          >
            {permissionsList.map((permission) => (
              <MenuItem
                key={permission}
                value={permission}
                className="create-role-menu-item"
              >
                <Checkbox
                  checked={permissions.includes(permission)}
                  className="create-role-checkbox"
                />
                <ListItemText
                  primary={permission}
                  className="create-role-list-text"
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          className="create-role-button"
        >
          Create Role
        </Button>
        <Button
          onClick={() => navigate("/admin")}
          sx={{ mt: 2 }}
          className="create-role-back-button"
        >
          Back to Admin
        </Button>
      </form>
    </Container>
  );
};

export default CreateRole;
