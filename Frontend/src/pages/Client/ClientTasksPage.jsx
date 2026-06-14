import { useEffect, useState } from 'react';
import { apiService } from '../../api/api';
import ClientTaskRow from '../../components/client/ClientTaskRow';
import './Styles/ClientTasks.css';

const ClientTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await apiService.client.getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message || 'נכשלה טעינת המשימות');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
        // המרה מפורשת למספר: אם זה 1 יהפוך ל-0, אחרת 1
        const newStatus = Number(currentStatus) === 1 ? 0 : 1;
        
        console.log("DEBUG: Original status:", currentStatus);
        console.log("DEBUG: Sending new status to server:", newStatus);

        await apiService.client.toggleTask(taskId, newStatus);
        
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.Task_ID === taskId ? { ...task, completed: newStatus } : task
            )
        );
    } catch (err) {
        alert('נכשל עדכון סטטוס המשימה: ' + err.message);
    }
  };

  if (loading) return <div className="client-tasks-loading">טוען משימות...</div>;
  if (error) return <div className="client-tasks-error">שגיאה: {error}</div>;

  return (
    <div className="client-tasks-container">
      <h2 className="client-tasks-title">🏋️‍♂️ המשימות והאימונים שלי</h2>
      <hr className="client-tasks-divider" />
      
      <div className="client-tasks-list">
        {tasks.length === 0 ? (
          <div className="client-tasks-empty">
            <p>אין לך משימות פתוחות להיום. עבודה טובה!</p>
          </div>
        ) : (
          tasks.map(task => (
            <ClientTaskRow 
              key={task.Task_ID} 
              task={task} 
              onToggleComplete={handleToggleTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClientTasksPage;