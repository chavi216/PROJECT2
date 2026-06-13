import { useEffect, useState } from 'react';
import { apiService } from '../../api/api'; 
import VideoPlayer from '../../components/common/VideoPlayer'; 
import './Styles/ClientVideos.css'; // ✅ ייבוא קובץ העיצוב החדש

// מגדירים את הכתובת של השרת (Backend) שלנו
const BASE_URL = 'http://localhost:3000';

const ClientVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiService.client.getVideos();
        setVideos(data);
      } catch (err) {
        setError(err.message || 'שגיאה בטעינת סרטונים');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="client-videos-loading">טוען סרטונים...</div>;
  if (error) return <div className="client-videos-error">{error}</div>;

  return (
    <div className="client-videos-container">
      <h2 className="client-videos-title">סרטוני הכושר שלי 🎥</h2>
      <hr className="client-videos-divider" />
      
      {videos.length === 0 ? (
        <div className="client-videos-empty">
          <p>אין סרטונים זמינים כרגע.</p>
        </div>
      ) : (
        <div className="client-videos-grid">
          {videos.map(video => (
            <VideoPlayer 
              key={video.video_ID} 
              url={`${BASE_URL}${video.video_url}`}
              title={video.title} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientVideosPage;