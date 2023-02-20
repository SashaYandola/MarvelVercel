import ErrorMessage from "../errorMessages/ErrorMessage";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (window.performance && window.performance.navigation.type === 1) {
      // Если страница была загружена напрямую, без перехода по ссылке,
      // перенаправляем пользователя на страницу входа
      navigate('/login');
    } else {
      // Если страница была загружена через ссылку,
      // перенаправляем пользователя на предыдущую страницу
      navigate(location.state?.from || '/');
    }
  }

  return (
    <div>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
      <button
        to={'#'}
        onClick={goBack}
        style={{ 'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013', 'marginTop': '40px', 'textAlign': 'center' }}>Back</button>
    </div>
  );
};

export default NotFound;
