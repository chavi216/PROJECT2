import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiService } from '../../api/api';
import './styles/NutritionistDashboard.css'; 

const NutritionistDashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        activeClients: 0,
        pendingTasks: 0, 
        unreadMessages: 0 
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // מושך את הלקוחות האמיתיים כדי לספור אותם
                const clients = await apiService.nutritionist.getClients();
                setStats(prev => ({ 
                    ...prev, 
                    activeClients: clients.length 
                }));
            } catch (error) {
                console.error("שגיאה במשיכת נתוני דשבורד:", error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="nutritionist-dashboard-container">
            <h2 className="nutritionist-dashboard-title">שלום, {user?.name || 'תזונאי'} 👋</h2>
            <p className="nutritionist-dashboard-subtitle">
                ברוך הבא ללוח הבקרה של התזונאי. הנה תמונת מצב להיום:
            </p>

            <div className="nutritionist-stats-grid">
                <div className="nutritionist-stat-card">
                    <h3>מטופלים פעילים</h3>
                    <p className="nutritionist-stat-number">{stats.activeClients}</p>
                </div>
                <div className="nutritionist-stat-card">
                    <h3>משימות פתוחות לביצוע</h3>
                    <p className="nutritionist-stat-number">{stats.pendingTasks}</p>
                </div>
                <div className="nutritionist-stat-card">
                    <h3>הודעות חדשות</h3>
                    <p className="nutritionist-stat-number">{stats.unreadMessages}</p>
                </div>
            </div>
        </div>
    );
};

export default NutritionistDashboardPage;