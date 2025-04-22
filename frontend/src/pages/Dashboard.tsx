import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Check if the user is an admin and redirect
  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <Container className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Welcome, {user?.username}!
      </Typography>
      <Typography variant="body1" className="dashboard-info">
        This is your dashboard. Your role might grant you different permissions.
      </Typography>
      {user?.role && (
        <Typography variant="body2" className="dashboard-role">
          Your Role: {user.role.name}
        </Typography>
      )}
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={{ mt: 3 }}
        className="dashboard-logout-button"
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
