import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

interface UserOption {
  _id: string;
  username: string;
}

interface RoleOption {
  _id: string;
  name: string;
}

const AssignRole = () => {
  const [users, setUsers] = useState<UserOption[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:5000/api/users/get-users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(usersResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }
    };

    const fetchRoles = async () => {
      try {
        const rolesResponse = await axios.get(
          "http://localhost:5000/api/roles/get-roles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoles(rolesResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchUsers();
    fetchRoles();
  }, [token]);

  const handleAssignRole = async () => {
    setError(null);
    setSuccessMessage(null);
    if (!selectedUser || !selectedRole) {
      setError("Please select a user and a role.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/assign-role",
        { userId: selectedUser, roleId: selectedRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage(response.data.message);
      setSelectedUser("");
      setSelectedRole("");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container maxWidth="sm" className="assign-role-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="assign-role-title"
      >
        Assign Role to User
      </Typography>
      {error && (
        <Alert severity="error" className="assign-role-error">
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" className="assign-role-success">
          {successMessage}
        </Alert>
      )}
      <FormControl fullWidth margin="normal" className="form-group">
        <InputLabel id="user-select-label" className="assign-role-label">
          User
        </InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="User"
          className="assign-role-select"
        >
          {users.map((user) => (
            <MenuItem
              key={user._id}
              value={user._id}
              className="assign-role-menu-item"
            >
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" className="form-group">
        <InputLabel id="role-select-label" className="assign-role-label">
          Role
        </InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          label="Role"
          className="assign-role-select"
        >
          {roles.map((role) => (
            <MenuItem
              key={role._id}
              value={role._id}
              className="assign-role-menu-item"
            >
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignRole}
        fullWidth
        sx={{ mt: 2 }}
        className="assign-role-button"
      >
        Assign Role
      </Button>
      <Button
        onClick={() => navigate("/admin")}
        sx={{ mt: 2 }}
        className="assign-role-back-button"
      >
        Back to Admin
      </Button>
    </Container>
  );
};

export default AssignRole;
