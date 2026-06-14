import { useEffect, useState } from 'react';
import { apiService } from '../../api/api';
import FoodPlanDayTable from '../../components/client/FoodPlanDayTable';
import './Styles/ClientFoodPlan.css'; 

const ClientFoodPlanPage = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodPlan = async () => {
      try {
        const data = await apiService.client.getFoodPlan();
        setFoodLogs(data);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת תוכנית התזונה');
      } finally {
        setLoading(false);
      }
    };
    loadFoodPlan();
  }, []);

  if (loading) return <div className="client-food-plan-loading">טוען תוכנית תזונה...</div>;
  if (error) return <div className="client-food-plan-error">שגיאה: {error}</div>;

  return (
    <div className="client-food-plan-container">
      <h2 className="client-food-plan-title">🥗 תוכנית התזונה שלי</h2>
      <hr className="client-food-plan-divider" />
      <div className="client-food-plan-content">
        <FoodPlanDayTable foodLogs={foodLogs} />
      </div>
    </div>
  );
};

export default ClientFoodPlanPage;