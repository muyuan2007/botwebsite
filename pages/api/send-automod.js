import db_pool from '../../components/db_pool';

function replaceObj(settingType, settingContents) {
    
    let messageSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 40, timeunit: 'minutes', duration: 2400}
    let emojiSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 20, timeunit: 'minutes', duration: 1200}
    let mentionSpamInfo = {punishments:['Delete message', 'Mute', 'Warn'],maxes:[8,2],  channel_whitelists:{},role_whitelists:{}, points: 6, timeval: 3, timeunit: 'hours', duration: 10800}
    let stickerSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours', duration: 7200}
    let attachmentSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 3, timeunit: 'hours', duration: 10800}
    let linkSpamInfo = {punishments:[],maxes:[6,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours', duration: 7200}

    let lineBreakInfo = {punishments:[],top:15,points:0,timeunit:'minutes',timeval:30,channel_whitelists:{},role_whitelists:{}, duration: 1800}
    let capInfo = {punishments:[],top:99,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}, duration: 2700}
    let duplicateMsgInfo = {punishments:[],top:5,points: 4,timeunit:'hours',timeval:2,channel_whitelists:{},role_whitelists:{}, duration: 7200}
    let duplicateCharInfo = {punishments:[],top:30,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}, duration: 2700}

    let inviteInfo = {punishments: [], points: 5, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}, duration: 0}
    let nsfwInfo = {punishments: ['Delete message','Ban'], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}, duration: 0}
    let hateSpeechInfo = {punishments: ['Delete message', 'Warn', 'Tempban'], points: 15, timeunit: 'days',timeval:3,channel_whitelists:{},role_whitelists:{}, duration: 259200}
    let selfbotInfo = {punishments:['Delete message','Ban'], points:0, timeunit:'minutes',timeval:0,role_whitelists:{}, duration: 0}

    let badWordInfo = [{title: 'slurs', 
                        punishments: [ 'Delete message', 'Warn' ], 
                        availableOptions: ['Delete message', 'Mute','Warn'],
                        words: { 
                            nigger: 'Substring', 
                            fag: 'Substring', 
                            tranny: 'Substring', 
                            trannies: 'Substring', 
                            chingchong: 'Substring', 
                            'ching chang': 'Substring' }, 
                        points: 20, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0 },

                    ]
    let badLinkInfo = [{title: 'nsfw', 
                        punishments: ['Delete message', 'Ban'], 
                        availableOptions: ['Delete message', 'Ban'],
                        words: {
                            'pornhub': 'Substring', 
                            'xvideos': 'Substring', 
                            'spankbang': 'Substring',
                            'xnxx': 'Substring', 
                            'xhamster': 'Substring',
                            'chaturbate': 'Substring',
                            'youporn': 'Substring', 
                            'tnaflix': 'Substring',
                            'nuvid': 'Substring',
                            'drtuber': 'Substring',
                            'xxxbunker': 'Substring',
                            'xxxvideo': 'Substring',
                            'fapvidhd': 'Substring', 
                            'xxxvideos247': 'Substring', 
                            'pornhd': 'Substring', 
                            'redtube': 'Substring', 
                            'fapster': 'Substring', 
                            'tastyblacks': 'Substring',
                            'hclips': 'Substring', 
                            'tube8': 'Substring'
                            }, 
                        points: 0, 
                        timeval: 0, 
                        timeunit: 'minutes',
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0
                        },
                       {title: 'gory', 
                       punishments: ['Delete message', 'Ban'], 
                       availableOptions: ['Delete message', 'Ban'],
                       words: {
                            'bestgore': 'Substring', 
                            'theync': 'Substring',
                            'kaotic': 'Substring',
                            'goregrish': 'Substring', 
                            'crazyshit': 'Substring', 
                            'efukt': 'Substring',
                            'runthegauntlet': 'Substring', 
                            'ogrishforum': 'Substring'
                        }, 
                        points: 0, 
                        timeval: 0,
                        timeunit: 'minutes',
                        whitelistedRoles: {},
                        whitelistedChannels: {}, 
                        duration: 0}]

    let settings = {
        messagespam: messageSpamInfo, 
        emojispam: emojiSpamInfo, 
        mentionspam: mentionSpamInfo, 
        stickerspam: stickerSpamInfo, 
        attachmentspam: attachmentSpamInfo,
        linkspam: linkSpamInfo,
        linebreaks: lineBreakInfo,
        toomanycaps: capInfo,
        duplicatemessage: duplicateMsgInfo,
        duplicatecharacters: duplicateCharInfo,
        invites: inviteInfo,
        nsfwcontent: nsfwInfo,
        hatespeech: hateSpeechInfo,
        selfbot: selfbotInfo,
        badwords: {categories: badWordInfo},
        badLinks: {categories: badLinkInfo}
    }

    settings[settingType] = settingContents
    return settings
}


async function handler(req, res) {
    if (req.method === 'POST') {
        const tables = ['messagespam', 'mentionspam', 'emojispam', 'linkspam', 'stickerspam', 'attachmentspam', 'duplicatecharacters', 'duplicatemessages', 'linebreaks', 'toomanycaps', 'hatespeech', 'invites', 'nsfwcontent', 'selfbot', 'badlinks', 'badwords']
        const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(n => `$${n}`)
        
        const data = req.body;
        
        let dataToSend;


        const guildid = BigInt(data.guild)

        function checkIfIdExists(table) {
            return new Promise((resolve, reject) => {
                db_pool.query(`SELECT * FROM ${table} where guild_id=$1`, [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }

        function checkIfGuildidExists() {
            return new Promise((resolve, reject) => {
                db_pool.query(`SELECT * FROM msg_automod where guild_id=$1`, [guildid], (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })

            })
        }

       
        if (data.type == 'spam') {
            let { table, punishments, whitelistedChannels, whitelistedRoles, limit, timeValue, actualTime, punishTime, warnPoints } = data
            dataToSend = {punishments: punishments, maxes: limit, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: actualTime, timeval: timeValue}    
        } 
        
        if (data.type == 'general') {
            await checkIfIdExists('automodgeneral').then(res => {
                let { whitelistedChannels, whitelistedRoles } = data
                if (res.rows.length == 0) {
                    db_pool.query(`INSERT INTO automodgeneral (guild_id, channel_whitelists, role_whitelists) VALUES ($1, $2, $3)`, [guildid, whitelistedChannels, whitelistedRoles])}
                else {
                    db_pool.query(`UPDATE automodgeneral SET guild_id=$1, channel_whitelists=$2, role_whitelists=$3 WHERE guild_id=$1`,[guildid, whitelistedChannels, whitelistedRoles])
            }})   
        } 
        
        if (data.type == 'nabased') {
            let { table, punishments, whitelistedChannels, whitelistedRoles, limit, timeval, actualTime, punishTime, warnPoints } = data
            dataToSend = {punishments: punishments, maxes: limit, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: actualTime, timeval: timeval}

                 
        } 
        
        if (data.type == 'taabased') {
            let { table, punishments, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, timeval, timeunit } = data
            dataToSend = {punishments: punishments, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: timeunit, timeval: timeval}
           
            
        }

        if (data.type == 'selfbot') {
            let { punishments, table, whitelistedRoles, timeval, timeunit, points, duration } = data
            dataToSend = {punishments: punishments, role_whitelists: whitelistedRoles, points: points, duration: duration, timeunit: timeunit, timeval: timeval}
        } 
        
        if (data.type == 'blacklist') {
            let { table, categories } = data
            dataToSend = {categories: categories}
        }

        if (data.type != 'general') {

            await checkIfGuildidExists().then(res => {
                if (res.rows.length == 0) {
                    const emptyData = replaceObj(data.table, dataToSend);
                    db_pool.query(`INSERT INTO msg_automod (guild_id, ${tables.join(', ')}) VALUES (${nums.join(', ')})`, [guildid].concat(Object.values(emptyData)))}
                else {
                    db_pool.query(`UPDATE msg_automod SET guild_id=$1, ${data.table}=$2`,[guildid, dataToSend])
            }
            })
        }

    }

    res.status(201).json({message: "success"})

}

export default handler