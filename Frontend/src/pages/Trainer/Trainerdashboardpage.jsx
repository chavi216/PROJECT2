import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiService } from '../../api/api';
import './Styles/TrainerDashboard.css'; 

const TrainerDashboardPage = () => {
    const { user } = useContext(AuthContext);

    const [stats, setStats] = useState({
        activeClients: 0,
        uploadedVideos: 0,
        pendingTasks: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const clients = await apiService.trainer.getClients();
                const videos = await apiService.trainer.getVideos();
                const tasks = await apiService.trainer.getAllTasks();

                const pendingTasks = tasks.filter(
                    task => task.completed === 0 || task.completed === false
                ).length;

                setStats({
                    activeClients: clients.length,
                    uploadedVideos: videos.length,
                    pendingTasks
                });

            } catch (error) {
                console.error('Dashboard Error:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="trainer-dashboard-container">
            <h2 className="trainer-dashboard-title">
                שלום, {user?.name || 'מאמן'} 💪
            </h2>

            <p className="trainer-dashboard-subtitle">
                ברוך הבא ללוח הבקרה של המאמן
            </p>

            <div className="trainer-stats-grid">
                <div className="trainer-stat-card">
                    <h3>מתאמנים פעילים</h3>
                    <p className="trainer-stat-number">
                        {stats.activeClients}
                    </p>
                </div>

                <div className="trainer-stat-card">
                    <h3>משימות פתוחות</h3>
                    <p className="trainer-stat-number">
                        {stats.pendingTasks}
                    </p>
                </div>

                <div className="trainer-stat-card">
                    <h3>סרטונים שהועלו</h3>
                    <p className="trainer-stat-number">
                        {stats.uploadedVideos}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboardPage;