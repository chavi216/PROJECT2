import db from '../config/db.js';

export const createFoodPlanInDB = async (planData) => {
    const { From_ID, To_ID, food, calories, date } = planData;
    const query = `INSERT INTO FoodLog (From_ID, To_ID, food, calories, date) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [From_ID, To_ID, food, calories, date]);
    return result;
};

export const updateFoodPlanInDB = async (Table_ID, food, calories) => {
    const query = `UPDATE FoodLog SET food = ?, calories = ? WHERE Table_ID = ?`;
    const [result] = await db.query(query, [food, calories, Table_ID]);
    return result;
};

export const deleteFoodPlanFromDB = async (Table_ID) => {
    const query = `DELETE FROM FoodLog WHERE Table_ID = ?`;
    const [result] = await db.query(query, [Table_ID]);
    return result;
};

export const getClientFoodLogsFromDB = async (To_ID) => {
    const query = `SELECT * FROM FoodLog WHERE To_ID = ? ORDER BY date DESC`;
    const [rows] = await db.query(query, [To_ID]);
    return rows;
};

export const getMyClientsFromDB = async (nutritionistId) => {
    const query = `SELECT ID, name, email, phone_number FROM Users WHERE nutritionist_id = ? AND role = 'client'`;
    const [rows] = await db.query(query, [nutritionistId]);
    return rows;
};