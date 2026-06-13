import { useEffect, useState } from 'react';
import { apiService } from '../../api/api';
import ClientProfileCard from '../../components/client/ClientProfileCard';
import { useNavigate } from 'react-router-dom';
import './Styles/ClientDashboard.css'; // ✅ ייבוא קובץ העיצוב החדש

const ClientDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiService.client.getInfo();
        
        // --- שינוי זמני: כאן אנחנו בודקים רק את התזונאי ---
        if (!data.nutritionist_id) {
          navigate('/client/onboarding');
          return; 
        }

        setProfile(data);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת פרופיל המשתמש');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  if (loading) return <div className="client-dashboard-loading">טוען פרופיל...</div>;
  if (error) return <div className="client-dashboard-error">שגיאה: {error}</div>;

  return (
    <div className="client-dashboard-container">
      <h2 className="client-dashboard-title">👋 ברוך הבא לדשבורד שלך</h2>
      <hr className="client-dashboard-divider" />
      <div className="client-profile-wrapper">
        <ClientProfileCard
          clientInfo={profile}
          onImageUpdated={(profileImage) => setProfile((current) => ({ ...current, profile_image: profileImage }))}
        />
      </div>
    </div>
  );
};

export default ClientDashboardPage;
