import { Typography, Container, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout and user

  const handleLogout = () => {
    logout();
    navigate("/"); // Explicitly redirect to the user dashboard
  };

  return (
    <Container className="admin-dashboard-container">
      <Typography variant="h4" gutterBottom className="admin-dashboard-title">
        Admin Dashboard
      </Typography>
      <Grid container spacing={2} className="admin-actions-grid">
        <Grid item xs={12} sm={6} className="admin-action-item">
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/admin/create-role")}
            className="admin-button create-role-button"
          >
            Create Role
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} className="admin-action-item">
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/admin/assign-role")}
            className="admin-button assign-role-button"
          >
            Assign Role to User
          </Button>
        </Grid>

        {/* Add more admin functionalities here */}
      </Grid>
      <Button
        variant="outlined"
        onClick={handleLogout}
        className="admin-logout-button"
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default AdminDashboard;
