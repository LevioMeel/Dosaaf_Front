import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export async function querys(query, values) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.execute(query, values);
        return results;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        connection.release();
    }
}
