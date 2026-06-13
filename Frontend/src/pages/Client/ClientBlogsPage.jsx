import { useEffect, useState } from 'react';
import { apiService } from '../../api/api'; 
import './Styles/ClientBlogs.css'; // ✅ ייבוא קובץ העיצוב החדש

const ClientBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await apiService.client.getBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת מאמרים');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="client-blogs-message">טוען מאמרים...</div>;
  if (error) return <div className="client-blogs-error">{error}</div>;

  return (
    <div className="client-blogs-container">
      <h2 className="client-blogs-title">מאמרים ובלוגים מומלצים 📖</h2>
      <hr className="client-blogs-divider" />
      
      {blogs.length === 0 ? (
        <p className="client-blogs-message">אין מאמרים זמינים כרגע.</p>
      ) : (
        <div className="client-blogs-list">
          {blogs.map(blog => {
            const isExpanded = expandedBlogId === blog.blog_ID;
            const textToShow = (!isExpanded && blog.body && blog.body.length > 100) 
              ? blog.body.substring(0, 100) + '...' 
              : blog.body;

            return (
              <div key={blog.blog_ID} className="client-blog-card">
                <h4 className="client-blog-title">{blog.Title}</h4>
                <p className="client-blog-text">
                  {textToShow}
                </p>
                {blog.body && blog.body.length > 100 && (
                  <button 
                    className="client-blog-read-more"
                    onClick={() => setExpandedBlogId(isExpanded ? null : blog.blog_ID)}
                  >
                    {isExpanded ? 'הצג פחות' : 'קרא עוד...'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientBlogsPage;