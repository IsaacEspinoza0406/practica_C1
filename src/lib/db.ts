/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://isaac:123@127.0.0.1:5435/school_db',
});

export const query = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};