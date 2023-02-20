import ErrorMessage from "../errorMessages/ErrorMessage";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  }

  return (
    <div>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
      <button
        onClick={goBack}
        style={{ 'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013', 'marginTop': '40px', 'textAlign': 'center' }}>Back</button>
    </div>
  );
};

export default NotFound;
