import ErrorMessage from "../errorMessages/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // Проверяем, была ли страница загружена напрямую, без перехода по ссылке
    if (window.performance && window.performance.navigation.type === 1) {
      navigate('/');
    } else {
      navigate(-1);
    }

  }

  return (
    <div>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
      <Link
        to={'#'}
        onClick={goBack}
        style={{ 'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013', 'marginTop': '40px', 'textAlign': 'center' }}>Back</Link>
    </div>
  );
};

export default NotFound;
