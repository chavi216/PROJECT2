import { useState, useEffect } from 'react';
import { apiService } from '../../api/api';
import './Styles/AdminVideos.css'; 

const AdminVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await apiService.admin.getContent('video');
        setVideos(data);
      } catch {
        setMessage({ text: 'שגיאה בטעינת הסרטונים', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleDeleteVideo = async (videoId, title) => {
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק את הסרטון "${title}"?`)) return;

    try {
      await apiService.admin.deleteContent('video', videoId);
      setMessage({ text: 'הסרטון נמחק בהצלחה', type: 'success' });
      setVideos(videos.filter(v => v.video_ID !== videoId));
    } catch {
      setMessage({ text: 'מחיקת הסרטון נכשלה', type: 'error' });
    }
  };

  return (
    <div className="admin-videos-container">
      <h1 className="admin-videos-title">ניהול סרטונים</h1>
      
      {message.text && (
        <div className={`admin-videos-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? <p>טוען נתונים...</p> : (
        <div className="admin-videos-table-wrapper">
          <table className="admin-videos-table">
            <thead>
              <tr>
                <th>מזהה</th>
                <th>כותרת</th>
                <th>הועלה על ידי</th>
                <th>צפייה</th>
                <th className="center">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.video_ID}>
                  <td>{video.video_ID}</td>
                  <td className="bold">{video.title}</td>
                  <td>{video.creator_name}</td>
                  <td>
                    <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="admin-videos-table-link">
                      צפה
                    </a>
                  </td>
                  <td className="center">
                    <button 
                      className="admin-videos-btn-delete"
                      onClick={() => handleDeleteVideo(video.video_ID, video.title)}
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

export default AdminVideosPage;
