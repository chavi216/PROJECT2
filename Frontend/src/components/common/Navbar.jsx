import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link className="navbar-logo" to="/">
        <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-copy"><strong>איזון</strong><small>תזונה • כושר • בריאות</small></span>
      </Link>
      <div className="navbar-actions">
        {user?.token ? (
          <>
            <button className="notification-button" aria-label="התראות">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>
              <span />
            </button>
            <div className="user-menu">
              <span className="user-avatar">{user.name?.charAt(0) || 'U'}</span>
              <span className="user-welcome"><small>ברוכים הבאים</small><strong>{user.name}</strong></span>
              <button className="logout-btn" onClick={handleLogout} aria-label="התנתקות">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/></svg>
                <span>יציאה</span>
              </button>
            </div>
          </>
        ) : <Link to="/login" className="login-link">התחברות</Link>}
      </div>
    </header>
  );
};

export default Navbar;
