import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessages/ErrorMessage";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  }

  return (
    <div>
      <Helmet>
        <meta name="description" content="Erorr page" />
        <title>404</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
      <button
        onClick={goBack}
        style={{ 'display': 'block', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013', 'textAlign': 'center', 'margin': '30px auto', 'padding': '10px 30px' }}>Back</button>
    </div>
  );
};

export default NotFound;
