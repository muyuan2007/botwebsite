import db_pool from '../../components/db_pool';

async function handler(req, res) {
    if (req.method === 'POST') {

        const data = req.body;
        

        const guildid = BigInt(data.guild)
        const { rules, ruleType } = data
        
        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                db_pool.query('SELECT * FROM autokickban where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
        await checkIfIdExists().then(res => {
            if (res.rows.length == 0) {
                db_pool.query(`INSERT INTO autokickban (guild_id, ${ruleType}rules) VALUES ($1, $2)`, [guildid, rules])
            }
            else {
                db_pool.query(`UPDATE autokickban SET guild_id=$1, ${ruleType}rules=$2 WHERE guild_id=$1`,[guildid, rules])
            }})

       
        }

    res.status(201).json({message: "success"})

}

export default handler