import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminBlogs.css'

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('users'); 
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchData = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      if (activeTab === 'users') {
        const data = await apiService.admin.getAllUsers();
        setUsers(data);
      } else if (activeTab === 'blogs') {
        const data = await apiService.admin.getContent('blog');
        setBlogs(data);
      } else if (activeTab === 'videos') {
        const data = await apiService.admin.getContent('video');
        setVideos(data);
      }
    } catch (error) {
      setMessage({ text: 'שגיאה בטעינת הנתונים מהשרת', type: 'error' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // מחיקת משתמש
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את המשתמש "${userName}"? פעולה זו תסיר את כל המידע המקושר אליו.`)) return;

    try {
      await apiService.admin.deleteUser(userId);
      setMessage({ text: 'המשתמש נמחק בהצלחה', type: 'success' });
      setUsers(users.filter(u => u.ID !== userId)); // עדכון הרשימה במסך
    } catch (error) {
      setMessage({ text: error.message || 'מחיקת המשתמש נכשלה', type: 'error' });
    }
  };

  // מחיקת תוכן (בלוג או סרטון)
  const handleDeleteContent = async (type, id) => {
    const contentTypeName = type === 'blog' ? 'הבלוג' : 'הסרטון';
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את ${contentTypeName} הזה?`)) return;

    try {
      await apiService.admin.deleteContent(type, id);
      setMessage({ text: 'התוכן הוסר בהצלחה', type: 'success' });
      
      if (type === 'blog') {
        setBlogs(blogs.filter(b => b.blog_ID !== id));
      } else {
        setVideos(videos.filter(v => v.video_ID !== id));
      }
    } catch {
      setMessage({ text: 'מחיקת התוכן נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">פאנל ניהול מערכת - אדמין</h1>

      {/* הודעות מערכת זמניות */}
      {message.text && (
        <div className={`admin-dashboard-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* תפריט ניווט לשוניות (Tabs) */}
      <div className="admin-tabs-container">
        <button 
          className={`admin-tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')} 
        >
          ניהול משתמשים
        </button>
        <button 
          className={`admin-tab-button ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')} 
        >
          ניהול בלוגים
        </button>
        <button 
          className={`admin-tab-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')} 
        >
          ניהול סרטוני כושר
        </button>
      </div>

      {loading ? (
        <div className="admin-dashboard-loading">טוען נתונים...</div>
      ) : (
        <div>
          {/* לשונית 1: טבלת משתמשים */}
          {activeTab === 'users' && (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ת.ז (ID)</th>
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
                      <td>
                        <span className={`admin-role-badge role-${user.role || 'client'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.phone_number}</td>
                      <td className="center">
                        <button 
                          className="admin-btn-delete"
                          onClick={() => handleDeleteUser(user.ID, user.name)}
                        >
                          מחק משתמש
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* לשונית 2: טבלת בלוגים */}
          {activeTab === 'blogs' && (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>מזהה</th>
                    <th>כותרת הבלוג</th>
                    <th>פורסם על ידי</th>
                    <th>קהל יעד</th>
                    <th className="center">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(blog => (
                    <tr key={blog.blog_ID}>
                      <td>{blog.blog_ID}</td>
                      <td style={{ fontWeight: '500' }}>{blog.Title}</td>
                      <td>{blog.author_name}</td>
                      <td>{blog.audience_type}</td>
                      <td className="center">
                        <button 
                          className="admin-btn-delete"
                          onClick={() => handleDeleteContent('blog', blog.blog_ID)}
                        >
                          הסר בלוג
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* לשונית 3: טבלת סרטונים */}
          {activeTab === 'videos' && (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>מזהה</th>
                    <th>שם הסרטון</th>
                    <th>קישור URL</th>
                    <th>הועלה על ידי</th>
                    <th className="center">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map(video => (
                    <tr key={video.video_ID}>
                      <td>{video.video_ID}</td>
                      <td style={{ fontWeight: '500' }}>{video.title}</td>
                      <td>
                        <a href={video.video_url} target="_blank" rel="noreferrer" className="admin-table-link">
                          צפייה בסרטון
                        </a>
                      </td>
                      <td>{video.creator_name}</td>
                      <td className="center">
                        <button 
                          className="admin-btn-delete"
                          onClick={() => handleDeleteContent('video', video.video_ID)}
                        >
                          הסר סרטון
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
