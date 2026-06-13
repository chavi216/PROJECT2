import { useEffect, useState } from 'react';
import { apiService } from '../../api/api';

const TrainerVideoLibrary = () => {
    const [videos, setVideos] = useState([]);

    const loadVideos = async () => {
        const data = await apiService.trainer.getVideos();
        setVideos(data);
    };

    useEffect(() => {
        loadVideos();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('למחוק את הסרטון?')) return;

        await apiService.trainer.deleteVideo(id);

        setVideos(prev =>
            prev.filter(v => v.video_ID !== id)
        );
    };

    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>כותרת</th>
                    <th>למי נשלח</th>
                    <th>צפייה</th>
                    <th>מחיקה</th>
                </tr>
            </thead>

            <tbody>
                {videos.map(video => (
                    <tr key={video.video_ID}>
                        <td>{video.title}</td>

                        <td>
                            {video.client_name || 'כל הלקוחות'}
                        </td>

                        <td>
                            <a
                                href={`http://localhost:3000${video.video_url}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                ▶️ צפייה
                            </a>
                        </td>

                        <td>
                            <button
                                onClick={() =>
                                    handleDelete(video.video_ID)
                                }
                            >
                                🗑️ מחק
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TrainerVideoLibrary;