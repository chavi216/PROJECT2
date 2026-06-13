import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from './Button';
import './styles/TaskManager.css'; // ייבוא של קובץ העיצוב החדש

const TaskManager = ({ clientId, role }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // ניהול טופס
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const fetchTasks = async () => {
        try {
            const data = await apiService[role].getTasks(clientId);
            setTasks(data);
        } catch (error) {
            console.error("שגיאה בטעינת משימות:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [clientId, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTaskId) {
                await apiService[role].updateTask(editingTaskId, { Title: title, Body: body });
            } else {
                await apiService[role].createTask({ client_ID: clientId, Title: title, Body: body });
            }
            setTitle('');
            setBody('');
            setEditingTaskId(null);
            fetchTasks(); // רענון הרשימה
        } catch (error) {
            alert("שגיאה בשמירת המשימה: " + error.message);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.Title);
        setBody(task.Body);
        setEditingTaskId(task.Task_ID);
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm("למחוק את המשימה?")) return;
        try {
            await apiService[role].deleteTask(taskId);
            fetchTasks();
        } catch {
            alert("שגיאה במחיקת המשימה");
        }
    };

    if (loading) return <div>טוען משימות...</div>;

    return (
        <div className="task-manager-container">
            <h3 className="task-manager-title">ניהול משימות למטופל</h3>
            
            <form onSubmit={handleSubmit} className="task-form">
                <input 
                    type="text" 
                    placeholder="כותרת המשימה" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="task-input task-input-title"
                />
                <input 
                    type="text" 
                    placeholder="תיאור (למשל: לשתות מים בבוקר)" 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                    className="task-input task-input-desc"
                />
                <Button type="submit">{editingTaskId ? 'עדכן משימה' : 'הוסף משימה'}</Button>
                {editingTaskId && (
                    <Button type="button" onClick={() => { setEditingTaskId(null); setTitle(''); setBody(''); }}>
                        בטל
                    </Button>
                )}
            </form>

            <ul className="task-list">
                {tasks.length === 0 ? <li>אין משימות למטופל זה.</li> : tasks.map(task => (
                    <li key={task.Task_ID} className="task-item">
                        <div>
                            <strong>{task.Title}</strong>
                            <p className="task-item-desc">{task.Body}</p>
                            <span className={`task-item-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                                סטטוס: {task.completed ? 'בוצע' : 'ממתין לביצוע'}
                            </span>
                        </div>
                        <div className="task-item-actions">
                            <button onClick={() => handleEdit(task)} className="task-action-btn edit-btn">✏️</button>
                            <button onClick={() => handleDelete(task.Task_ID)} className="task-action-btn delete-btn">🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
