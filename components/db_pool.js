import { Pool } from "pg"

const db_pool = new Pool({
        user:process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password:process.env.DB_PASS,
        port:process.env.DB_PORT
    })

process.on("SIGTERM", async () => {
    await db_pool.end();
    process.exit(0);
  });


export default db_pool;
