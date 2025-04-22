import { Typography, Container } from "@mui/material";
import "../App.css";
const Unauthorized = () => {
  return (
    <Container className="unauthorized-container">
      <Typography
        variant="h4"
        color="error"
        gutterBottom
        className="unauthorized-title"
      >
        Unauthorized
      </Typography>
      <Typography variant="body1" className="unauthorized-message">
        You do not have permission to access this page.
      </Typography>
    </Container>
  );
};

export default Unauthorized;
