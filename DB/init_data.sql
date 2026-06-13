INSERT INTO Users (ID, name, email, password, role, address, phone_number, trainer_id, nutritionist_id, profile_image) VALUES
(1, 'Admin System', 'admin@lifestyle.com', '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.', 'admin', 'Tel Aviv, Israel', '050-0000000', NULL, NULL, NULL),
(2, 'Tom Trainer', 'tom@lifestyle.com', '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.', 'trainer', 'Haifa, Israel', '052-1111111', NULL, NULL, NULL),
(3, 'Nina Nutrition', 'nina@lifestyle.com', '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.', 'nutritionist', 'Jerusalem, Israel', '054-2222222', NULL, NULL, NULL),
(4, 'Charlie Client', 'charlie@gmail.com', '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.', 'client', 'Ramat Gan, Israel', '050-3333333', 2, 3, NULL),
(5, 'Dana Diet', 'dana@gmail.com', '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.', 'client', 'Ashdod, Israel', '053-4444444', 2, NULL, NULL);

-- ===================================================
-- 2. הכנסת מאמרים / בלוגים (Blogs)
-- ===================================================
-- בלוג 1 נכתב ע"י המאמן לכולם, בלוג 2 ע"י התזונאית לכולם, בלוג 3 ספציפי לצ'ארלי
INSERT INTO Blogs (blog_ID, User_ID, Title, body, audience_type, recipient_client_id) VALUES
(1, 2, '5 תרגילי בטן חובה', 'במאמר זה נלמד על חמשת התרגילים החשובים ביותר לחיזוק שרירי הליבה, כולל פלאנק, כפיפות בטן ועוד...', 'all', NULL),
(2, 3, 'חשיבות החלבון אחרי אימון', 'חלבון הוא אבן הבניין של השריר. מומלץ לצרוך כ-20 עד 30 גרם חלבון מיד לאחר אימון כוח...', 'all', NULL),
(3, 3, 'תפריט מיוחד לצליאקים', 'צ''ארלי, הכנתי לך תפריט מיוחד ללא גלוטן שיעזור לך לשמור על רמות אנרגיה גבוהות לאורך היום מבלי להרגיש כבדות...', 'client', 4);

-- ===================================================
-- 3. הכנסת משימות (Tasks)
-- ===================================================
-- משימות שניתנו ללקוחות ע"י המאמן והתזונאית
INSERT INTO Tasks (Title, Body, manager_ID, client_ID, completed) VALUES
('אימון כוח: רגליים', 'עליך לבצע 3 סטים של סקוואטים, 15 חזרות כל אחד. מנוחה של דקה בין סט לסט.', 2, 4, 0),
('ריצת בוקר', 'ריצה קלה של 5 קילומטרים בקצב דיבור בחוף הים.', 2, 5, 1),
('רישום תזונה - יום ד', 'אל תשכח להזין את כל ארוחות הצהריים שלך השבוע באפליקציה כדי שאוכל לעקוב.', 3, 4, 0);

-- ===================================================
-- 4. הכנסת הודעות (Messages)
-- ===================================================
-- התכתבויות בין הלקוחות לצוות
INSERT INTO Messages (from_ID, to_ID, body, is_read) VALUES
(2, 4, 'היי צ''ארלי, איך אתה מרגיש אחרי האימון של אתמול? יש כאבים חריגים?', 1),
(4, 2, 'היה קשה אבל מעולה! השרירים קצת תפוסים אבל הכל טוב.', 0),
(3, 4, 'שמתי לב שלא עדכנת את התזונה אתמול בערב, הכל בסדר?', 0);

-- ===================================================
-- 5. הכנסת יומן תזונה (FoodLog)
-- ===================================================
-- מה צ'ארלי (4) אכל ודיווח לתזונאית (3)
INSERT INTO FoodLog (From_ID, To_ID, food, calories, date) VALUES
(4, 3, 'חזה עוף עם כוס אורז מלא', 450, '2024-05-15'),
(4, 3, 'יוגורט פרו (20 גרם חלבון) עם חצי תפוח', 200, '2024-05-15'),
(4, 3, 'סלט קינואה ועשבי תיבול עם טחינה', 350, '2024-05-16');

-- ===================================================
-- 6. הכנסת התראות (Notifications)
-- ===================================================
-- התראות שנשלחות למשתמשים
INSERT INTO Notifications (User_ID, Manager_ID) VALUES
(4, 2),
(5, 2),
(4, 3);

-- ===================================================
-- 7. הכנסת סרטוני כושר (FitnessVideos)
-- ===================================================
-- סרטונים שהמאמן שיתף עם הלקוחות
INSERT INTO FitnessVideos (From_ID, To_ID, title, video_url) VALUES
(2, 4, 'הדרכה: איך לעשות דדליפט נכון מבלי לפצוע את הגב','/uploads/videoplayback.mp4'),
(2, 5, 'אימון מתיחות בוקר ל-10 דקות', '/uploads/1.mp4');