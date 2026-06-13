import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminUsers.css'; // ✅ ייבוא קובץ העיצוב החדש

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getAllUsers();
        setUsers(data);
      } catch {
        setMessage({ text: 'שגיאה בטעינת המשתמשים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${userName}"?`)) return;

    try {
      await apiService.admin.deleteUser(userId);
      setMessage({ text: 'המשתמש נמחק בהצלחה', type: 'success' });
      setUsers(users.filter(u => u.ID !== userId));
    } catch (error) {
      setMessage({ text: error.message || 'מחיקת המשתמש נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-users-container">
      <h1 className="admin-users-title">ניהול משתמשים</h1>
      
      {message.text && (
        <div className={`admin-users-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-users-table-wrapper">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>ת.ז</th>
                <th>שם מלא</th>
                <th>אימייל</th>
                <th>תפקיד</th>
                <th>טלפון</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.ID}>
                  <td>{user.ID}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="role-cell">{user.role}</td>
                  <td>{user.phone_number}</td>
                  <td className="center">
                    <button 
                      className="admin-users-btn-delete"
                      onClick={() => handleDeleteUser(user.ID, user.name)}
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

export default AdminUsersPage;
