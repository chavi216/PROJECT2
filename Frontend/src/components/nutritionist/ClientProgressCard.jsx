import './styles/ClientProgressCard.css'; 

const ClientProgressCard = ({ client }) => {
    if (!client) {
        return <div className="progress-empty-state">בחר מטופל כדי להציג את נתוני המעקב שלו</div>;
    }

    return (
        <div className="progress-card">
            <h3 className="progress-card-title">מדדי מעקב: {client.name}</h3>
            <hr className="progress-card-divider" />
            
            <div className="progress-card-grid">
                <div className="progress-info-block">
                    <span className="progress-info-label">משקל נוכחי</span>
                    <span className="progress-info-value">{client.currentWeight || '--'} ק"ג</span>
                </div>
                <div className="progress-info-block">
                    <span className="progress-info-label">משקל יעד</span>
                    <span className="progress-info-value">{client.targetWeight || '--'} ק"ג</span>
                </div>
                <div className="progress-info-block">
                    <span className="progress-info-label">יעד קלורי יומי</span>
                    <span className="progress-info-value">{client.dailyCalories || '--'} קק"ל</span>
                </div>
            </div>
        </div>
    );
};

export default ClientProgressCard;