import db_pool from '../../components/db_pool';


async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const guildid = BigInt(data.guild)
        const rules = data.rules
        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                db_pool.query('SELECT * FROM autopunish where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
        await checkIfIdExists().then(res => {
            if (res.rows.length == 0) {
                db_pool.query('INSERT INTO autopunish (guild_id, rules) VALUES ($1, $2)', [guildid, rules])}
            else {
                db_pool.query('UPDATE autopunish SET guild_id=$1, rules=$2 WHERE guild_id=$1',[guildid, rules])
            }})
       
    
            
    }
    res.status(201).json({message: "success"})

}

export default handler