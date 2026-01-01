import db_pool from '../../components/db_pool';

async function handler(req, res) {
    if (req.method === 'POST') {
       
        
        const data = req.body;
       

        const guildid = BigInt(data.guild)
        const type = data.type
        const actions = data.actions
        let channel = undefined
        if (data.channel !== 'undefined') {
            channel = BigInt(data.channel)
        }

        let whInfo = {found: false, url: ""}
        await fetch(`https://discord.com/api/v8/channels/${channel}/webhooks`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
              }
        }).then(response => response.json()).then(data => {data.forEach(wh => {if (wh.name == "AMGX's Logging Minion") {whInfo.found = true; whInfo.url = wh.url;}})}).catch(error => {})
        
    
        if (!whInfo.found) {
            await fetch(`https://discord.com/api/v8/channels/${channel}/webhooks`, {
                method: "POST",
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: "AMGX's Logging Minion", avatar: "https://cdn.discordapp.com/attachments/1274041694018469980/1356831963679293481/MndBTSfgkAAAAASUVORK5CYII.png?ex=67eff9fc&is=67eea87c&hm=95f641dcd59f677052f202e1c8dd7f192d67384ed09dcf968bf9405d4a259498&"})
            }).then(response => response.json()).then(data => whInfo.url = data.url).catch(error => {})
        }

        const type_col_mapping = {
            "message": ["message_actions", "message_channel", "msg_webhook"],
            "member": ["member_actions", "member_channel", "member_webhook"],
            "moderation": ["moderations", "moderation_channel", "mod_webhook"],
            "server": ["server_actions", "server_channel", "server_webhook"],
            "vc": ["vc_actions", "voicestate_channel", "vc_webhook"]
        }

        function checkIfIdExists() {
            return new Promise((resolve, reject) => {
                db_pool.query('SELECT * FROM modlogs where guild_id=$1', [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }
        
        const [act_col, cha_col, wbh_col]= type_col_mapping[type]

        await checkIfIdExists().then(res => {
            if (res.rows.length == 0) 
                {db_pool.query(`INSERT INTO modlogs (guild_id, ${act_col}, ${cha_col}, ${wbh_col}) VALUES ($1, $2, $3, $4)`, [guildid, actions, channel, whInfo.url])}
            else {
                db_pool.query(`UPDATE modlogs SET guild_id=$1, ${act_col}=$2, ${cha_col}=$3, ${wbh_col}=$4 WHERE guild_id=$1`,[guildid, actions, channel, whInfo.url])
            }})
        
    }

    res.status(201).json({message: "success"})

}

export default handler