import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Revise bien sus credenciales en DATABASE_URL en el archivo .env.local');
}

const pool = new Pool({
  connectionString,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};