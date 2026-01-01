import db_pool from '../../components/db_pool';

function replaceObj(settingType, settingContents) {

    let generalSettings = { channel_whitelists: {}, role_whitelists: {}, ignored_words: [], caps_threshold: 120 }

    let messageSpamInfo = { punishments: [], maxes: [5, 2], channel_whitelists: {}, role_whitelists: {}, points: 5, timeval: 40, timeunit: 'minutes', duration: 2400 }
    let emojiSpamInfo = { punishments: [], maxes: [5, 2], channel_whitelists: {}, role_whitelists: {}, points: 0, timeval: 20, timeunit: 'minutes', duration: 1200 }
    let mentionSpamInfo = { punishments: ['Delete message', 'Mute', 'Warn'], maxes: [8, 2], channel_whitelists: {}, role_whitelists: {}, points: 6, timeval: 3, timeunit: 'hours', duration: 10800 }
    let stickerSpamInfo = { punishments: [], maxes: [5, 2], channel_whitelists: {}, role_whitelists: {}, points: 0, timeval: 2, timeunit: 'hours', duration: 7200 }
    let attachmentSpamInfo = { punishments: [], maxes: [5, 2], channel_whitelists: {}, role_whitelists: {}, points: 5, timeval: 3, timeunit: 'hours', duration: 10800 }
    let linkSpamInfo = { punishments: [], maxes: [6, 2], channel_whitelists: {}, role_whitelists: {}, points: 0, timeval: 2, timeunit: 'hours', duration: 7200 }

    let lineBreakInfo = { punishments: [], top: 15, points: 0, timeunit: 'minutes', timeval: 30, channel_whitelists: {}, role_whitelists: {}, duration: 1800 }
    let capInfo = { punishments: [], top: 99, points: 5, timeunit: 'minutes', timeval: 45, channel_whitelists: {}, role_whitelists: {}, duration: 2700 }
    let duplicateMsgInfo = { punishments: [], top: 5, points: 4, timeunit: 'hours', timeval: 2, channel_whitelists: {}, role_whitelists: {}, duration: 7200 }
    let duplicateCharInfo = { punishments: [], top: 30, points: 5, timeunit: 'minutes', timeval: 45, channel_whitelists: {}, role_whitelists: {}, duration: 2700 }

    let inviteInfo = { punishments: [], points: 5, timeunit: 'minutes', timeval: 0, channel_whitelists: {}, role_whitelists: {}, duration: 0 }
    let selfbotInfo = { punishments: ['Delete message', 'Ban'], points: 0, timeunit: 'minutes', timeval: 0, role_whitelists: {}, duration: 0 }

    let badWordInfo = [{
        title: 'slurs',
        punishments: ['Delete message', 'Warn'],
        availableOptions: ['Delete message', 'Mute', 'Warn'],
        words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'],
        points: 20,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    },

    ]
    let badLinkInfo = [{
        title: 'nsfw',
        punishments: ['Delete message', 'Ban'],
        availableOptions: ['Delete message', 'Ban'],
        words: ['pornhub', 'xvideos', 'spankbang', 'xnxx', 'xhamster', 'chaturbate', 'youporn', 'tnaflix', 'nuvid', 'drtuber', 'xxxbunker', 'xxxvideo', 'fapvidhd', 'xxxvideos247', 'pornhd', 'redtube', 'fapster', 'tastyblacks', 'hclips', 'tube8'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    },
    {
        title: 'gory',
        punishments: ['Delete message', 'Ban'],
        availableOptions: ['Delete message', 'Ban'],
        words: ['bestgore', 'theync', 'kaotic', 'goregrish', 'crazyshit', 'efukt', 'runthegauntlet', 'ogrishforum'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }]

    let badNickInfo = [{
        title: 'triggering (substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['rapist', 'adolf', 'pedo', 'porn', 'paedo', 'molest', 'auschwitz', 'nazi', 'holocaust', 'hitler'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }, {
        title: 'triggering (no substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['sex', 'rape', 'raping'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 0
    }, {
        title: 'slurs',
        punishments: ['Warn', 'Tempban'],
        availableOptions: ['Warn', 'Tempban'],
        words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'],
        points: 20,
        timeval: 3,
        timeunit: 'days',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }]
    let badNameInfo = [{
        title: 'triggering (substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['rapist', 'adolf', 'pedo', 'porn', 'paedo', 'molest', 'auschwitz', 'nazi', 'holocaust', 'hitler'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }, {
        title: 'triggering (no substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['sex', 'rape', 'raping'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 0
    }, {
        title: 'slurs',
        punishments: ['Warn', 'Tempban'],
        availableOptions: ['Warn', 'Tempban'],
        words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'],
        points: 20,
        timeval: 3,
        timeunit: 'days',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }]

    let badStatusInfo = [{
        title: 'triggering (substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['rapist', 'adolf', 'pedo', 'porn', 'paedo', 'molest', 'auschwitz', 'nazi', 'holocaust', 'hitler'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }, {
        title: 'triggering (no substring)',
        punishments: ['Ban'],
        availableOptions: ['Ban'],
        words: ['sex', 'rape', 'raping'],
        points: 0,
        timeval: 0,
        timeunit: 'minutes',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 0
    }, {
        title: 'slurs',
        punishments: ['Warn', 'Tempban'],
        availableOptions: ['Warn', 'Tempban'],
        words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'],
        points: 20,
        timeval: 3,
        timeunit: 'days',
        whitelistedRoles: {},
        whitelistedChannels: {},
        duration: 0,
        substring: 1
    }]

    let settings = {
        automodgeneral: generalSettings,
        messagespam: messageSpamInfo,
        emojispam: emojiSpamInfo,
        mentionspam: mentionSpamInfo,
        stickerspam: stickerSpamInfo,
        attachmentspam: attachmentSpamInfo,
        linkspam: linkSpamInfo,
        linebreaks: lineBreakInfo,
        toomanycaps: capInfo,
        duplicatemessages: duplicateMsgInfo,
        duplicatecharacters: duplicateCharInfo,
        invites: inviteInfo,
        selfbot: selfbotInfo,
        badwords: { categories: badWordInfo },
        badlinks: { categories: badLinkInfo },
        badnicks: { categories: badNickInfo },
        badnames: { categories: badNameInfo },
        badstatuses: { categories: badStatusInfo },
        

    }

    settings[settingType] = settingContents
    return settings
}


async function handler(req, res) {
    if (req.method === 'POST') {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(n => `$${n}`)

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
            dataToSend = { punishments: punishments, maxes: limit, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: actualTime, timeval: timeValue }
        }

        if (data.type == 'general') {
            let { whitelistedChannels, whitelistedRoles, ignoredWords, capsThreshold } = data
            dataToSend = { channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, ignored_words: ignoredWords, caps_threshold: capsThreshold }
        }

        if (data.type == 'nabased') {
            let { table, punishments, whitelistedChannels, whitelistedRoles, limit, timeval, actualTime, punishTime, warnPoints } = data
            dataToSend = { punishments: punishments, top: limit, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: actualTime, timeval: timeval }


        }

        if (data.type == 'taabased') {
            let { table, punishments, whitelistedChannels, whitelistedRoles, warnPoints, punishTime, timeval, timeunit } = data
            dataToSend = { punishments: punishments, channel_whitelists: whitelistedChannels, role_whitelists: whitelistedRoles, points: warnPoints, duration: punishTime, timeunit: timeunit, timeval: timeval }


        }

        if (data.type == 'selfbot') {
            let { punishments, table, whitelistedRoles, timeval, timeunit, points, duration } = data
            dataToSend = { punishments: punishments, role_whitelists: whitelistedRoles, points: points, duration: duration, timeunit: timeunit, timeval: timeval }
        }

        if (data.type == 'blacklist') {
            let { table, categories } = data
            dataToSend = { categories: categories }
        }

        await checkIfGuildidExists().then(async (res) => {
            if (res.rows.length == 0) {
                const emptyData = replaceObj(data.table, dataToSend);
                await db_pool.query(`INSERT INTO msg_automod (guild_id, ${Object.keys(emptyData).join(', ')}) VALUES (${nums.join(', ')})`, [guildid].concat(Object.values(emptyData)))
            }
            else {
                await db_pool.query(`UPDATE msg_automod SET guild_id=$1, ${data.table}=$2 WHERE guild_id=$1`, [guildid, dataToSend])
            }
        })

    }

    res.status(201).json({ message: "success" })

}

export default handler