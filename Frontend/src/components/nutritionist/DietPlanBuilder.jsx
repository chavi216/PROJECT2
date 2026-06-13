import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { apiService } from '../../api/api'; // הוספנו ייבוא של ה-API
import './styles/DietPlanBuilder.css';

const DietPlanBuilder = ({ clientId, onSaveSuccess }) => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clientId) {
            setError('נא לבחור מטופל תחילה');
            return;
        }
        if (!foodName || !calories || !date) {
            setError('נא למלא את כל השדות');
            return;
        }

        setError('');
        setLoading(true);

        try {
            // קריאה לשרת עם המבנה שהמודל מצפה לו
            await apiService.nutritionist.createFoodPlan({
                To_ID: clientId,       // ה-ID של הלקוח
                food: foodName,        // שם המאכל
                calories: parseInt(calories), // המרה למספר
                date: date             // תאריך
            });

            alert('הארוחה התווספה בהצלחה לתפריט המטופל!');
            
            // איפוס השדות לאחר הצלחה
            setFoodName('');
            setCalories('');
            setDate('');
            
            // רענון הנתונים אם הועברה פונקציה מהאבא
            if (onSaveSuccess) onSaveSuccess();
        } catch (err) {
            setError(err.message || 'נכשל שמירת הפריט בתפריט. נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="diet-builder-card">
            <h3 className="diet-builder-title">הוספת פריט לתפריט התזונה</h3>
            
            {error && <div className="diet-builder-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="diet-builder-form">
                <div className="diet-builder-input-group">
                    <Input 
                        type="text"
                        placeholder="שם המאכל (למשל: חזה עוף ואורז)"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                </div>
                
                <div className="diet-builder-input-group">
                    <Input 
                        type="number"
                        placeholder="קלוריות"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                </div>

                <div className="diet-builder-input-group">
                    <Input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? 'שומר...' : 'הוסף לתפריט'}
                </Button>
            </form>
        </div>
    );
};

export default DietPlanBuilder;