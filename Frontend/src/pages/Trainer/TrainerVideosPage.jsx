import VideoManager from '../../components/Trainer/VideoManager';
import TrainerVideoLibrary from '../../components/Trainer/TrainerVideoLibrary';
import './Styles/TrainerVideos.css'; 
const TrainerVideosPage = () => {
  return (
    <div className="trainer-videos-container">
      <h1 className="trainer-videos-title">ניהול ספריית הסרטונים 🎥</h1>

      <VideoManager role="trainer" />

      <hr className="trainer-videos-divider" />

      <TrainerVideoLibrary />
    </div>
  );
};

export default TrainerVideosPage;