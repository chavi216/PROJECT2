import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext";
import { apiService } from "../api/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, user, loading: authLoading, authMessage, clearAuthMessage } = useContext(AuthContext);
  const navigate = useNavigate();

  const dashboardByRole = {
    client: '/client/dashboard',
    trainer: '/trainer/dashboard',
    nutritionist: '/nutritionist/dashboard',
    admin: '/admin/dashboard',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    clearAuthMessage();
    setLoading(true);

    try {
      const response = await apiService.auth.login({ email, password });
      
      if (response.id) { 
        localStorage.setItem('userID', response.id);
      }
      
      login({
        token: response.token,
        role: response.role,
        name: response.name,
        id: response.id 
      });

      if (response.role === "client") {
        navigate("/client/dashboard", { replace: true });
      } else if (response.role === 'trainer') { 
        navigate('/trainer/dashboard', { replace: true });
      } else if (response.role === "nutritionist") {
        navigate("/nutritionist/dashboard", { replace: true }); 
      } else if (response.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("סוג משתמש זה אינו נתמך במערכת.");
      }
    } catch (err) {
      setError(err.message || "אימייל או סיסמה שגויים. נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;
  if (user?.token && dashboardByRole[user.role]) {
    return <Navigate to={dashboardByRole[user.role]} replace />;
  }

  return (
    <main className="auth-page login-page" dir="rtl">
      <aside className="auth-showcase">
        <Link className="auth-brand" to="/login"><span>איזון</span><small>תזונה • כושר • בריאות</small></Link>
        <div className="auth-art" aria-hidden="true">
          <span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" />
          <div className="art-card art-card-main"><strong>המסע שלך</strong><b>מתחיל כאן</b><small>אימון • תזונה • התקדמות</small></div>
          <div className="art-card art-card-float"><span>+24%</span><small>התקדמות החודש</small></div>
        </div>
        <div className="auth-quote"><span>“</span><p>כל הכלים, אנשי המקצוע והמעקב האישי במקום אחד.</p></div>
      </aside>
      <section className="auth-form-side">
       <div className="login-container">
      <h2 className="login-title">התחברות למערכת</h2>
      
      {(error || authMessage) && <p className="login-error">{error || authMessage}</p>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="כתובת אימייל:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        
        <Input
          label="סיסמה:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        <div className="login-button-wrapper">
          <Button type="submit" disabled={loading}>
            {loading ? "מתחבר..." : "התחבר"}
          </Button>
        </div>
      </form>

      <p className="login-footer">
        משתמש חדש במערכת? <Link to="/register" className="login-link">צור חשבון חדש כאן</Link>
      </p>
       </div>
      </section>
    </main>
  );
};

export default Login;
