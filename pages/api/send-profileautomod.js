async function handler(req, res) {
    if (req.method === 'POST') {
        const { Pool, Client } = require('pg')
        const client = new Client({
            user:process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password:process.env.DB_PASS,
            port:process.env.DB_PORT
        })
        client.connect()
        
        const data = req.body;
        


        const guildid = BigInt(data.guild)

        function checkIfIdExists(table) {
            return new Promise((resolve, reject) => {
                client.query(`SELECT * FROM ${table} where guild_id=$1`, [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
       
        if (data.type == 'blacklist') {
            await checkIfIdExists(data.table).then(res => {
                let { table, categories } = data
                let data_tosend = {categories: categories}

                if (res.rows.length == 0) {
                    client.query(`INSERT INTO ${table} (guild_id, categories) VALUES ($1, $2)`, [guildid, categories])
                } else {
                    client.query(`UPDATE ${table} SET guild_id=$1, categories=$2 WHERE guild_id=$1`,[guildid, categories])                   
                }
            })
       
        } if (data.type == 'profiletaabased') {
            await checkIfIdExists('nsfwpfp').then(res => {
                let { table, punishments,  whitelistedRoles, warnPoints, punishTime, timeval, timeunit } = data
                if (res.rows.length == 0) {
                    client.query(`INSERT INTO nsfwpfp (guild_id, punishments, role_whitelists, points, duration, timeunit, timeval) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [guildid, punishments, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])
                }
                else {
                    client.query(`UPDATE nsfwpfp SET guild_id=$1, punishments=$2, role_whitelists=$3, points=$4, duration=$5, timeunit=$6, timeval=$7 WHERE guild_id=$1`,[guildid, punishments, whitelistedRoles, warnPoints, punishTime, timeunit, timeval])                   
                }
            })
          
        }

      

        client.end()
    }

    res.status(201).json({message: "success"})

}

export default handler