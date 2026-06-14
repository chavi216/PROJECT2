import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminBlogs.css'; 

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('blog');
        setBlogs(data);
      } catch {
        setMessage({ text: 'שגיאה בטעינת הבלוגים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הבלוג "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('blog', blogId);
      setMessage({ text: 'הבלוג נמחק בהצלחה', type: 'success' });
      setBlogs(blogs.filter(b => b.blog_ID !== blogId));
    } catch {
      setMessage({ text: 'מחיקת הבלוג נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-blogs-container">
      <h1 className="admin-blogs-title">ניהול בלוגים</h1>
      
      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>מזהה</th>
                <th>כותרת</th>
                <th>פורסם על ידי</th>
                <th>קהל יעד</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.blog_ID}>
                  <td>{blog.blog_ID}</td>
                  <td className="bold">{blog.Title}</td>
                  <td>{blog.author_name}</td>
                  <td>{blog.audience_type}</td>
                  <td className="center">
                    <button 
                      className="admin-btn-delete" 
                      onClick={() => handleDeleteBlog(blog.blog_ID, blog.Title)}
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

export default AdminBlogsPage;
