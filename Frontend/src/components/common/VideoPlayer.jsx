import './styles/VideoPlayer.css';

const VideoPlayer = ({ url, title }) => {
  console.log("VIDEO URL:", url);
  if (!url) return <p className="no-video">לא נמצא קובץ וידאו זמין</p>;

  return (
    <div className="video-player-container">
      {title && <h4 className="video-title">{title}</h4>}
      <div className="video-wrapper">
        <video controls className="main-video-player">
          <source src={url} type="video/mp4" />
          הדפדפן שלך אינו תומך בניגון וידאו.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;