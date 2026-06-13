import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext";
import { apiService } from "../api/api";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import './styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        ID: "", name: "", email: "", password: "",
        address: "", phone_number: "", role: "client"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login, user, loading: authLoading } = useContext(AuthContext); 

    const dashboardByRole = {
        client: '/client/dashboard',
        trainer: '/trainer/dashboard',
        nutritionist: '/nutritionist/dashboard',
        admin: '/admin/dashboard',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await apiService.auth.register({
                ...formData,
                ID: parseInt(formData.ID)
            });

            login({
                token: response.token,
                role: response.role,
                name: response.name
            });

            setSuccess("ההרשמה בוצעה בהצלחה! מנתב אותך למערכת...");
            
            setTimeout(() => {
                if (response.role === "nutritionist") navigate("/nutritionist/dashboard", { replace: true });
                else if (response.role === "trainer") navigate("/trainer/dashboard", { replace: true });
                else navigate("/client/dashboard", { replace: true });
            }, 1000); 

        } catch (err) {
            setError(err.message || "נכשלה ההרשמה. ודא כי ה-ID או האימייל אינם קיימים כבר במערכת.");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;
    if (user?.token && dashboardByRole[user.role]) {
        return <Navigate to={dashboardByRole[user.role]} replace />;
    }

    return (
      <main className="auth-page register-page" dir="rtl">
        <aside className="auth-showcase">
          <Link className="auth-brand" to="/login"><span>איזון</span><small>תזונה • כושר • בריאות</small></Link>
          <div className="register-showcase-copy">
            <span className="eyebrow">הצעד הראשון שלך</span>
            <h1>בריאות טובה יותר,<br />מתחילה היום.</h1>
            <p>הצטרפו למעטפת מקצועית שמחברת בין אימון, תזונה וליווי אישי.</p>
          </div>
          <div className="showcase-pills"><span>ליווי אישי</span><span>תוכן מקצועי</span><span>מעקב חכם</span></div>
        </aside>
        <section className="auth-form-side register-form-side">
         <div className="register-container">
            <h2 className="register-title">הרשמה למערכת</h2>

            {error && <p className="register-message error">{error}</p>}
            {success && <p className="register-message success">{success}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <Input label="תעודת זהות (ID):" type="text" name="ID" value={formData.ID} onChange={handleChange} required placeholder="הזן תעודת זהות" />
                <Input label="שם מלא:" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="הזן שם מלא" />

                <div className="register-role-group">
                    <label className="register-role-label">סוג חשבון:</label>
                    <select name="role" value={formData.role} onChange={handleChange} required className="register-role-select">
                        <option value="client">מתאמן / לקוח</option>
                        <option value="nutritionist">תזונאי מוסמך</option>
                        <option value="trainer">מאמן כושר</option>
                    </select>
                </div>

                <Input label="כתובת אימייל:" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                <Input label="סיסמה:" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
                <Input label="כתובת מגורים:" type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="הזן כתובת" />
                <Input label="מספר טלפון:" type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required placeholder="הזן מספר טלפון" />

                <div className="register-button-wrapper">
                    <Button type="submit" disabled={loading}>
                        {loading ? "מבצע הרשמה..." : "הרשם והיכנס למערכת"}
                    </Button>
                </div>
            </form>

            <p className="register-footer">
                כבר רשום במערכת? <Link to="/login">התחבר כאן</Link>
            </p>
         </div>
        </section>
      </main>
    );
};

export default Register;
