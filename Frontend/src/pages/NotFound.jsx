import { Link } from 'react-router-dom';
import './styles/NotFound.css';

const NotFound = () => (
  <main className="not-found-page" dir="rtl">
    <div className="not-found-card">
      <span className="not-found-code">404</span>
      <h1>העמוד לא נמצא</h1>
      <p>הכתובת שהוזנה אינה קיימת או שהעמוד הועבר.</p>
      <Link to="/">חזרה למערכת</Link>
    </div>
  </main>
);

export default NotFound;
