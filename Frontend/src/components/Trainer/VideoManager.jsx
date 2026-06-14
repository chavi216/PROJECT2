import { useState, useEffect, useRef } from 'react';
import { apiService } from '../../api/api';
import Button from '../common/Button';
import './styles/VideoManager.css'; 

const VideoManager = ({ role }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [audienceType, setAudienceType] = useState('all');
    const [recipientClientId, setRecipientClientId] = useState('');
    const [clients, setClients] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await apiService.trainer.getClients();
                setClients(data);
            } catch (error) {
                console.error("שגיאה בטעינת לקוחות:", error);
            }
        };
        fetchClients();
    }, [role]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title) return alert("נא לבחור קובץ ולתת כותרת");

        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('audience_type', audienceType);
        if (audienceType === 'specific' && recipientClientId) {
            formData.append('recipient_client_id', recipientClientId);
        }

        try {
            await apiService.trainer.uploadVideo(formData);
            alert("הסרטון הועלה בהצלחה!");
            setFile(null);
            setTitle('');
        } catch (error) {
            alert("שגיאה בהעלאה: " + error.message);
        }
    };

    return (
        <div className="video-manager-container">
            <h3>🎬 העלאת סרטון כושר</h3>
            
            <input 
                type="text" 
                placeholder="שם הסרטון" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="video-manager-input" 
            />
            
            <label className="video-manager-label">קהל יעד:</label>
            <select 
                value={audienceType} 
                onChange={(e) => setAudienceType(e.target.value)} 
                className="video-manager-select"
            >
                <option value="all">🌍 לכולם (ציבורי)</option>
                <option value="my_clients">👥 לכל המטופלים שלי</option>
                <option value="specific">👤 למטופל ספציפי</option>
            </select>
            
            {audienceType === 'specific' && (
                <select 
                    value={recipientClientId} 
                    onChange={(e) => setRecipientClientId(e.target.value)} 
                    className="video-manager-select"
                >
                    <option value="">-- בחר מטופל --</option>
                    {clients.map(c => <option key={c.ID} value={c.ID}>{c.name}</option>)}
                </select>
            )}
            
            <div 
                onClick={() => fileInputRef.current.click()} 
                className="video-manager-upload-box"
            >
                {file ? `נבחר: ${file.name}` : "לחצי כאן לבחירת סרטון מהתיקייה"}
                <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="video/*" 
                    className="video-manager-hidden-input" 
                    onChange={handleFileChange} 
                />
            </div>
            
            <Button onClick={handleUpload}>פרסם סרטון</Button>
        </div>
    );
};

export default VideoManager;