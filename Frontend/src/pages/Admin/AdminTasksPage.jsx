import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminTasks.css'; // ✅ ייבוא קובץ העיצוב החדש

const AdminTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('task'); // נצטרך לתמוך בזה בשרת
        setTasks(data);
      } catch {
        setMessage({ text: 'שגיאה בטעינת המשימות (או שעדיין חסר חיבור בשרת)', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשימה "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('task', taskId); // נצטרך לתמוך בזה בשרת
      setMessage({ text: 'המשימה נמחקה בהצלחה', type: 'success' });
      setTasks(tasks.filter(t => t.Task_ID !== taskId));
    } catch {
      setMessage({ text: 'מחיקת המשימה נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-tasks-container">
      <h1 className="admin-tasks-title">ניהול משימות</h1>
      
      {message.text && (
        <div className={`admin-tasks-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-tasks-table-wrapper">
          <table className="admin-tasks-table">
            <thead>
              <tr>
                <th>מזהה</th>
                <th>כותרת המשימה</th>
                <th>הוצב על ידי (מזהה)</th>
                <th>שייך ללקוח (מזהה)</th>
                <th className="center">סטטוס</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.Task_ID}>
                  <td>{task.Task_ID}</td>
                  <td className="bold">{task.Title}</td>
                  <td>{task.manager_ID}</td>
                  <td>{task.client_ID}</td>
                  <td className="center">
                    {/* שימוש בקלאסים כדי להציג "ממתין" או "הושלם" בצורה בולטת ויפה */}
                    <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                      {task.completed ? 'הושלם' : 'ממתין'}
                    </span>
                  </td>
                  <td className="center">
                    <button 
                      className="admin-tasks-btn-delete"
                      onClick={() => handleDeleteTask(task.Task_ID, task.Title)}
                    >
                      מחק
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTasksPage;
