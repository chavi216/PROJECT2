import db from '../config/db.js';

export const getUserByEmail = async (email) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    const [rows] = await db.query(query, [email]);
    return rows[0]; 
};

export const createUser = async (userData) => {
    const query = `
        INSERT INTO Users (ID, name, email, password, address, phone_number, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        userData.ID,
        userData.name,
        userData.email,
        userData.password,
        userData.address,
        userData.phone_number,
        userData.role || 'client' 
    ];

    const [result] = await db.query(query, values);
    return result; 
};