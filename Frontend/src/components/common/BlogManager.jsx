import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import Button from './Button';
import './styles/BlogManager.css'; // ייבוא של קובץ העיצוב החדש

const BlogManager = ({ role }) => {
    const [blogs, setBlogs] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // מצבי הטופס
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [audienceType, setAudienceType] = useState('all'); // ברירת מחדל: לכולם
    const [recipientClientId, setRecipientClientId] = useState('');
    const [editingBlogId, setEditingBlogId] = useState(null);

    const loadData = async () => {
        try {
            const blogsData = await apiService[role].getBlogs();
            const clientsData = await apiService[role].getClients();
            setBlogs(blogsData);
            setClients(clientsData);
        } catch (error) {
            console.error("שגיאה בטעינת הנתונים:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            Title: title,
            body: body,
            audience_type: audienceType,
            recipient_client_id: audienceType === 'specific' ? recipientClientId : null
        };

        try {
            if (editingBlogId) {
                await apiService[role].updateBlog(editingBlogId, payload);
            } else {
                await apiService[role].createBlog(payload);
            }
            // איפוס טופס
            setTitle('');
            setBody('');
            setAudienceType('all');
            setRecipientClientId('');
            setEditingBlogId(null);
            loadData();
            alert("הבלוג נשמר בהצלחה!");
        } catch (error) {
            alert("שגיאה בשמירת הבלוג: " + error.message);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlogId(blog.blog_ID);
        setTitle(blog.Title);
        setBody(blog.body);
        setAudienceType(blog.audience_type);
        setRecipientClientId(blog.recipient_client_id || '');
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm("האם אתה בטוח שברצונך למחוק מאמר זה?")) return;
        try {
            await apiService[role].deleteBlog(blogId);
            loadData();
        } catch {
            alert("מחיקת המאמר נכשלה");
        }
    };

    if (loading) return <div>טוען מערכת בלוגים...</div>;

    return (
        <div className="blog-manager-container">
            <h3>{editingBlogId ? '📝 עריכת מאמר/בלוג' : '✍️ כתיבת מאמר/בלוג חדש'}</h3>
            
            <form onSubmit={handleSubmit} className="blog-form">
                <input 
                    type="text" 
                    placeholder="כותרת המאמר" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="blog-input"
                />
                <textarea 
                    placeholder="תוכן המאמר..." 
                    value={body} 
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                    className="blog-textarea"
                />

                <div className="blog-audience-wrapper">
                    <div>
                        <label className="blog-label">קהל יעד:</label>
                        <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} className="blog-select">
                            <option value="all">🌍 כל משתמשי המערכת (ציבורי)</option>
                            <option value="my_clients">👥 רק המטופלים שלי</option>
                            <option value="specific">👤 מטופל ספציפי בלבד</option>
                        </select>
                    </div>

                    {/* יוצג רק אם נבחר מטופל ספציפי */}
                    {audienceType === 'specific' && (
                        <div>
                            <label className="blog-label">בחר מטופל:</label>
                            <select 
                                value={recipientClientId} 
                                onChange={(e) => setRecipientClientId(e.target.value)} 
                                required
                                className="blog-select"
                            >
                                <option value="" disabled>-- בחר מטופל --</option>
                                {clients.map(c => (
                                    <option key={c.ID} value={c.ID}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="blog-buttons-wrapper">
                    <Button type="submit">{editingBlogId ? 'עדכן והפץ' : 'פרסם מאמר'}</Button>
                    {editingBlogId && (
                        <Button type="button" onClick={() => { setEditingBlogId(null); setTitle(''); setBody(''); setAudienceType('all'); }}>
                            בטל עריכה
                        </Button>
                    )}
                </div>
            </form>

            <hr />
            <h4>המאמרים שפרסמת בעבר:</h4>
            <div className="blog-list">
                {blogs.length === 0 ? <p>טרם פרסמת מאמרים.</p> : blogs.map(blog => (
                    <div key={blog.blog_ID} className="blog-item">
                        <div>
                            <h5 className="blog-item-title">{blog.Title}</h5>
                            <span className="blog-item-tag">
                                קהל יעד: {blog.audience_type === 'all' ? 'כל המערכת' : blog.audience_type === 'my_clients' ? 'הלקוחות שלי' : 'מטופל ספציפי'}
                            </span>
                        </div>
                        <div className="blog-item-actions">
                            <button onClick={() => handleEdit(blog)} className="blog-action-btn edit-btn">✏️ ערוך</button>
                            <button onClick={() => handleDelete(blog.blog_ID)} className="blog-action-btn delete-btn">🗑️ מחק</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogManager;
