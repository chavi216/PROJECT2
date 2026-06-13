import BlogManager from '../../components/common/BlogManager';
import './styles/NutritionistBlogs.css'; // ✅ ייבוא מתוך תיקיית styles

const NutritionistBlogsPage = () => {
    return (
        <div className="nutritionist-blogs-container">
            <div className="nutritionist-blogs-header">
                <h2 className="nutritionist-blogs-title">ניהול מאמרים ובלוגים</h2>
                <p className="nutritionist-blogs-subtitle">
                    כאן תוכל לכתוב, לערוך ולפרסם מאמרים למטופלים שלך או לכלל המערכת.
                </p>
            </div>
            
            {/* קריאה לקומפוננטה המשותפת עם התפקיד של התזונאי */}
            <BlogManager role="nutritionist" />
        </div>
    );
};

export default NutritionistBlogsPage;