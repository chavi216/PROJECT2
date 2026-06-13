import { useRef, useState } from 'react';
import './styles/ClientProfileCard.css';
import { clientApi } from '../../api/clientApi';
import { SERVER_URL } from '../../api/apiConfig';

const ClientProfileCard = ({ clientInfo, onImageUpdated }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!clientInfo?.name) return <div className="loading-info">טוען נתוני פרופיל...</div>;

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'יש לבחור קובץ תמונה בלבד.' });
      event.target.value = '';
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'התמונה גדולה מדי. הגודל המרבי הוא 8MB.' });
      event.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);
    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await clientApi.uploadProfileImage(formData);
      onImageUpdated?.(response.imageUrl);
      setMessage({ type: 'success', text: 'תמונת הפרופיל עודכנה בהצלחה.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'העלאת התמונה נכשלה.' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="profile-card">
      <button className="profile-header" onClick={() => fileInputRef.current?.click()} disabled={uploading} type="button">
        {clientInfo.profile_image ? (
          <img src={`${SERVER_URL}${clientInfo.profile_image}`} alt="תמונת פרופיל" className="profile-img" />
        ) : (
          <span className="profile-initials-circle">{clientInfo.name.charAt(0).toUpperCase()}</span>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/jpeg,image/png,image/webp,image/gif" />
        <span className="profile-upload-label">{uploading ? 'מעלה תמונה...' : 'לחצו לעדכון התמונה'}</span>
      </button>

      {message.text && <div className={`profile-upload-message ${message.type}`}>{message.text}</div>}

      <div className="profile-body">
        <div className="profile-item"><span className="item-label">שם מלא</span><span className="item-value">{clientInfo.name}</span></div>
        <div className="profile-item"><span className="item-label">אימייל</span><span className="item-value">{clientInfo.email}</span></div>
        <div className="profile-item"><span className="item-label">טלפון</span><span className="item-value">{clientInfo.phone_number || 'לא הוגדר'}</span></div>
        <div className="profile-item"><span className="item-label">כתובת</span><span className="item-value">{clientInfo.address || 'לא הוגדרה'}</span></div>
      </div>
    </div>
  );
};

export default ClientProfileCard;
