import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import TaskManager from '../../components/common/TaskManager';
import './Styles/TrainerTasks.css'; 

const TrainerTasksPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');

  // טעינת רשימת הלקוחות של המאמן
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.trainer.getClients();
        setClients(data);
      } catch (error) {
        console.error("שגיאה בטעינת לקוחות:", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="trainer-tasks-container">
      <h2 className="trainer-tasks-title">ניהול משימות כושר 📋</h2>
      <p className="trainer-tasks-subtitle">
        בחרי מתאמן כדי לצפות במשימות שלו או להקצות לו משימות חדשות:
      </p>
      
      <div className="trainer-tasks-select-wrapper">
        <select 
          className="trainer-tasks-select"
          value={selectedClientId} 
          onChange={(e) => setSelectedClientId(e.target.value)}
        >
          <option value="">-- בחרי מתאמן --</option>
          {clients.map(client => (
            <option key={client.ID} value={client.ID}>{client.name}</option>
          ))}
        </select>
      </div>

      <hr className="trainer-tasks-divider" />

      {selectedClientId ? (
        // התיקון כאן: מעבירים את ה-role ואת ה-clientId כדי שהקומפוננטה המשותפת תדע לאן לפנות
        <TaskManager 
          role="trainer" 
          clientId={selectedClientId} 
        />
      ) : (
        <p className="trainer-tasks-empty-state">
          נא לבחור מתאמן מהרשימה כדי לנהל משימות.
        </p>
      )}
    </div>
  );
};

export default TrainerTasksPage;