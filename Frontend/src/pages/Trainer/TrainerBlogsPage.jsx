import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import BlogManager from '../../components/common/BlogManager';
import './Styles/TrainerBlogs.css'; 

const TrainerBlogsPage = () => {
  const [clients, setClients] = useState([]);

  // טעינת רשימת הלקוחות כדי שהמאמן יוכל לבחור קהל יעד ספציפי אם ירצה
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await apiService.trainer.getClients();
        setClients(data);
      } catch (error) {
        console.error("שגיאה בטעינת לקוחות לבלוג:", error);
      }
    };
    fetchClients();
  }, []);

  const handleCreateBlog = async (blogData) => {
    try {
      await apiService.trainer.createBlog(blogData);
      alert('הפוסט פורסם בהצלחה בבלוג! ✍️');
    } catch (error) {
      console.error("שגיאה בפרסום הבלוג:", error);
      alert('התרחשה שגיאה בפרסום הפוסט.');
    }
  };

  return (
    <div className="trainer-blogs-container">
      <h2 className="trainer-blogs-title">בלוג כושר וטיפים ✍️</h2>
      <p className="trainer-blogs-subtitle">
        שתפי טיפים, אימונים ועדכונים עם המתאמנים שלך או עם כל המשתמשים באתר.
      </p>
      
      <BlogManager 
        clients={clients} 
        onCreateBlog={handleCreateBlog} 
        role="trainer" 
      />
    </div>
  );
};

export default TrainerBlogsPage;