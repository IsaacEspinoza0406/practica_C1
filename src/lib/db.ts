// src/lib/db.ts
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

console.log("intentando conectar con:", connectionString); 

if (!connectionString) {
  throw new Error('Por favor define DATABASE_URL en tu archivo .env.local');
}

const pool = new Pool({
  connectionString,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};