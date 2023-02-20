import ErrorMessage from "../errorMessages/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const goBack = () => {
    if (!searchParams.has('utm_source')) {
      navigate('/login'); // Перенаправляем пользователя на страницу входа
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
