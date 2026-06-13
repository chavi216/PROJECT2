import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientApi } from '../../api/clientApi';
import Button from '../../components/common/Button';
import './Styles/ClientOnboarding.css'; // ✅ ייבוא קובץ העיצוב החדש

const ClientOnboarding = () => {
  const [trainers, setTrainers] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedNutritionist, setSelectedNutritionist] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const data = await clientApi.getProfessionals(); 
        setTrainers(data.filter(p => p.role === 'trainer'));
        setNutritionists(data.filter(p => p.role === 'nutritionist'));
      } catch (error) {
        console.error("שגיאה בטעינת אנשי מקצוע", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // מוודאים שגם מאמן וגם תזונאי נבחרו לפני השליחה לשרת
    if (!selectedTrainer || !selectedNutritionist) {
      alert("יש לבחור גם מאמן וגם תזונאי כדי להמשיך");
      return;
    }

    try {
      await clientApi.updateTeam({
        trainer_id: selectedTrainer,
        nutritionist_id: selectedNutritionist
      });
      navigate('/client/dashboard');
    } catch (error) {
      alert("אירעה שגיאה בשמירת הנתונים. נסה שנית.");
      console.error(error);
    }
  };

  if (loading) return <div className="onboarding-loading">טוען נתונים...</div>;

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-title">ברוך הבא למערכת!</h2>
      <p className="onboarding-subtitle">כדי להתחיל, אנא בחר את המאמן והתזונאי שילוו אותך בתהליך.</p>

      <form onSubmit={handleSubmit}>
        <div className="onboarding-form-group">
          <label className="onboarding-label">
            בחר מאמן כושר: <span className="onboarding-required-star">*</span>
          </label>
          <select 
            className="onboarding-select"
            value={selectedTrainer} 
            onChange={(e) => setSelectedTrainer(e.target.value)}
            required // נוסף חזרה כדי למנוע שליחה ללא מאמן
          >
            <option value="" disabled>-- רשימת מאמנים --</option>
            {trainers.map(t => (
              <option key={t.ID} value={t.ID}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="onboarding-form-group">
          <label className="onboarding-label">
            בחר תזונאי: <span className="onboarding-required-star">*</span>
          </label>
          <select 
            className="onboarding-select"
            value={selectedNutritionist} 
            onChange={(e) => setSelectedNutritionist(e.target.value)}
            required
          >
            <option value="" disabled>-- רשימת תזונאים --</option>
            {nutritionists.map(n => (
              <option key={n.ID} value={n.ID}>{n.name}</option>
            ))}
          </select>
        </div>

        <div className="onboarding-actions">
          <Button type="submit">שמור והתחל לעבוד</Button>
        </div>
      </form>
    </div>
  );
};

export default ClientOnboarding;