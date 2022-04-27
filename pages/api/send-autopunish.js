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
        const rules = data.rules
        client.connect()
        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                client.query('SELECT * FROM autopunish where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
        await checkIfIdExists().then(res => {
            if (res.rows.length == 0) {
                client.query('INSERT INTO autopunish (guild_id, rules) VALUES ($1, $2)', [guildid, rules])}
            else {
                client.query('UPDATE autopunish SET guild_id=$1, rules=$2 WHERE guild_id=$1',[guildid, rules])
            }})
        
        
    }
    res.status(201).json({message: "success"})

}

export default handler