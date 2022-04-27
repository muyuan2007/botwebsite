async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { Pool, Client } = require('pg')
        const client = new Client({
            user:'postgres',
            host: 'localhost',
            database: 'postgres',
            password:'mysecretpassword',
            port:5432
        })

        const guildid = BigInt(data.guild)

        client.connect()
        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                client.query('SELECT * FROM bot_settings where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }

        if (Array.from(Object.keys(data)).includes('name')) {
            const name = data.name
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {('hi');client.query('INSERT INTO bot_settings (guild_id, bot_name) VALUES ($1, $2)', [guildid, name])}
                else {
                    client.query('UPDATE bot_settings SET guild_id=$1, bot_name=$2 WHERE guild_id=$1',[guildid, name])
                }})
        }

        if (Array.from(Object.keys(data)).includes('prefix')) {
            const prefix = data.prefix
            await checkIfIdExists().then(res => {
                if (res.rows.length == 0) 
                {client.query('INSERT INTO bot_settings (guild_id, bot_prefix) VALUES ($1, $2)', [guildid, prefix])}
                else {
                    client.query('UPDATE bot_settings SET guild_id=$1, bot_prefix=$2 WHERE guild_id=$1',[guildid, prefix])
                }})
        }

        
    }
    res.status(201).json({message: "success"})

}

export default handler