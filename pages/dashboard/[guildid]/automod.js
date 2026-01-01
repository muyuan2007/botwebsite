import { General,SpamAutomodSet,NABasedAutomodSet,TAAutomodSet,Selfbot,BlacklistBasedSet,CatProfileBasedSet,ProfileTAAutomodSet } from '../../../components/Automod'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import {  Grid, Container } from '@material-ui/core'
import { DatabaseFails } from '../../../components/Fails'
import Head from 'next/head'
import db_pool from '../../../components/db_pool'

const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


const drawerWidth = 210
function Automod(props) {
    
    const [id, changeId] = useState(0)
    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    
    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn(`/dashboard/${guildid}/automod`)
        }
        
    }
    useEffect(async ()=>{
        getthesession()
        if (!JSON.parse(localStorage.getItem("guilds")).map(guild => guild.id).includes(guildid)) {
            router.push('/')
        }
        else if (!inguild) {
            router.push(`https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`)
        }
    },[]);

    
    const roles = props.roles
    const channels = props.channels
    channels.sort((a, b) => parseInt(a.type) - parseInt(b.type))
    let channelinfo = []
    let roleinfo = []
    const roleobj = {}
    const channelobj = {}
    channels.forEach(channel => {channelinfo.push(`${channel.name}`); channelobj[`${channel.name}`]=channel.id})
    roles.forEach(role => {roleinfo.push(`${role.name}`); roleobj[`${role.name}`]=role.id})
    const colors = {'General Settings': 'white','Automod': 'lightgray','Logging': 'white','Autopunish': 'white','Auto Kick/Ban': 'white','Weblogs': 'white'}

    if (!props.erred) {
        return <Container style={{padding: '20px 0', width: 'calc(100% - 60px)'}} maxWidth="xl"> <Grid container spacing={4} >
            <General server={guildid} role_whitelists={props.generalInfo.role_whitelists} channel_whitelists={props.generalInfo.channel_whitelists} ignored_words={props.generalInfo.ignored_words} caps_threshold={props.generalInfo.caps_threshold} roles={roleinfo} channels={channelinfo} roleobj={roleobj} channelobj={channelobj}/>
            <SpamAutomodSet uid={id} table={'messagespam'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Message Spam" bottomoft="Messages" offUnit="Seconds" textWidth1={101.69} punishments={props.messageSpamInfo.punishments} maxes={props.messageSpamInfo.maxes} points={props.messageSpamInfo.points} duration={props.messageSpamInfo.duration} timeunit={props.messageSpamInfo.timeunit} timeval={props.messageSpamInfo.timeval} channel_whitelists={props.messageSpamInfo.channel_whitelists} role_whitelists={props.messageSpamInfo.role_whitelists}></SpamAutomodSet>
            <SpamAutomodSet uid={id} table={'emojispam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Emoji Spam' bottomoft={'Emojis'} offUnit='Seconds'textWidth1={76.23} punishments={props.emojiSpamInfo.punishments} maxes={props.emojiSpamInfo.maxes} points={props.emojiSpamInfo.points} duration={props.emojiSpamInfo.duration} timeunit={props.emojiSpamInfo.timeunit} timeval={props.emojiSpamInfo.timeval} channel_whitelists={props.emojiSpamInfo.channel_whitelists} role_whitelists={props.emojiSpamInfo.role_whitelists}/>
            <SpamAutomodSet uid={id} table={'mentionspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Mention Spam' bottomoft={'Mentions'} offUnit='Seconds'textWidth1={94.92} punishments={props.mentionSpamInfo.punishments} maxes={props.mentionSpamInfo.maxes} points={props.mentionSpamInfo.points} duration={props.mentionSpamInfo.duration} timeunit={props.mentionSpamInfo.timeunit} timeval={props.mentionSpamInfo.timeval} channel_whitelists={props.mentionSpamInfo.channel_whitelists} role_whitelists={props.mentionSpamInfo.role_whitelists}/>
            <SpamAutomodSet uid={id} table={'stickerspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Sticker Spam' bottomoft={'Stickers'} offUnit='Seconds'textWidth1={85.41} punishments={props.stickerSpamInfo.punishments} maxes={props.stickerSpamInfo.maxes} points={props.stickerSpamInfo.points} duration={props.stickerSpamInfo.duration} timeunit={props.stickerSpamInfo.timeunit} timeval={props.stickerSpamInfo.timeval} channel_whitelists={props.stickerSpamInfo.channel_whitelists} role_whitelists={props.stickerSpamInfo.role_whitelists} />
            <SpamAutomodSet uid={id} table={'attachmentspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Attachment Spam' bottomoft={'Attachments'} offUnit='Seconds'textWidth1={120.23} punishments={props.attachmentSpamInfo.punishments} maxes={props.attachmentSpamInfo.maxes} points={props.attachmentSpamInfo.points} duration={props.attachmentSpamInfo.duration} timeunit={props.attachmentSpamInfo.timeunit} timeval={props.attachmentSpamInfo.timeval} channel_whitelists={props.attachmentSpamInfo.channel_whitelists} role_whitelists={props.attachmentSpamInfo.role_whitelists}/>
            <SpamAutomodSet uid={id} table={'linkspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Link Spam' bottomoft={'Links'} offUnit='Seconds'textWidth1={65.56} punishments={props.linkSpamInfo.punishments} maxes={props.linkSpamInfo.maxes} points={props.linkSpamInfo.points} duration={props.linkSpamInfo.duration} timeunit={props.linkSpamInfo.timeunit} timeval={props.linkSpamInfo.timeval} channel_whitelists={props.linkSpamInfo.channel_whitelists} role_whitelists={props.linkSpamInfo.role_whitelists}/>
            <NABasedAutomodSet table={'linebreaks'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Line Breaks'} oftdesc={'line breaks'} textWidth1={87.47} punishments={props.lineBreakInfo.punishments} top={props.lineBreakInfo.top} points={props.lineBreakInfo.points} duration={props.lineBreakInfo.duration} timeunit={props.lineBreakInfo.timeunit} timeval={props.lineBreakInfo.timeval} channel_whitelists={props.lineBreakInfo.channel_whitelists} role_whitelists={props.lineBreakInfo.role_whitelists}/>
            <NABasedAutomodSet table={'toomanycaps'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Caps'} oftdesc={'% caps'} textWidth1={60.89} punishments={props.capInfo.punishments} top={props.capInfo.top} points={props.capInfo.points} duration={props.capInfo.duration} timeunit={props.capInfo.timeunit} timeval={props.capInfo.timeval} channel_whitelists={props.capInfo.channel_whitelists} role_whitelists={props.capInfo.role_whitelists}/>
            <NABasedAutomodSet table={'duplicatemessages'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Duplicate Messages'} oftdesc={'repeated messages'} textWidth1={152.55} punishments={props.duplicateMsgInfo.punishments} top={props.duplicateMsgInfo.top} points={props.duplicateMsgInfo.points} duration={props.duplicateMsgInfo.duration} timeunit={props.duplicateMsgInfo.timeunit} timeval={props.duplicateMsgInfo.timeval} channel_whitelists={props.duplicateMsgInfo.channel_whitelists} role_whitelists={props.duplicateMsgInfo.role_whitelists}/>
            <NABasedAutomodSet table={'duplicatecharacters'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Duplicate Characters" oftdesc="repeated characters" textWidth1={154.88} punishments={props.duplicateCharInfo.punishments} top={props.duplicateCharInfo.top} points={props.duplicateCharInfo.points} duration={props.duplicateCharInfo.duration} timeunit={props.duplicateCharInfo.timeunit} timeval={props.duplicateCharInfo.timeval} channel_whitelists={props.duplicateCharInfo.channel_whitelists} role_whitelists={props.duplicateCharInfo.role_whitelists}></NABasedAutomodSet>
            <TAAutomodSet table={'invites'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Invites" punishments={props.inviteInfo.punishments} points={props.inviteInfo.points} duration={props.inviteInfo.duration} timeunit={props.inviteInfo.timeunit} timeval={props.inviteInfo.timeval} channel_whitelists={props.inviteInfo.channel_whitelists} role_whitelists={props.inviteInfo.role_whitelists}></TAAutomodSet>
            <Selfbot server={guildid} roleobj={roleobj} roles={roleinfo} offtype="Selfbot Detection" punishments={props.selfbotInfo.punishments} points={props.selfbotInfo.points} duration={props.selfbotInfo.duration} timeunit={props.selfbotInfo.timeunit} timeval={props.selfbotInfo.timeval} role_whitelists={props.selfbotInfo.role_whitelists}/>
            <BlacklistBasedSet table={'badwords'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Words" categoryName="Word categories" placehold="Press enter to add a word" categories={props.badWordInfo}></BlacklistBasedSet>
            <BlacklistBasedSet table={'badlinks'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Links" categoryName="Link categories" placehold="Press enter to add a link" categories={props.badLinkInfo}></BlacklistBasedSet>
            <CatProfileBasedSet table={'badnicks'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Nicknames" categoryName="Nickname categories" placehold="Press enter to add a nickname" categories={props.badNickInfo}></CatProfileBasedSet>
            <CatProfileBasedSet table={'badnames'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Usernames" categoryName="Username categories" placehold="Press enter to add a username" categories={props.badNameInfo}></CatProfileBasedSet>
            <CatProfileBasedSet table={'badstatuses'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Custom Statuses" categoryName="Status categories" placehold="Press enter to add a status" categories={props.badStatusInfo}></CatProfileBasedSet>
            </Grid></Container> 
    } else {
        return <>
        <Head>
            <title>Failed to fetch server info</title>
        </Head>
        <DatabaseFails /></>
    }
}


export async function getServerSideProps(context) {
    const guildid = context.params.guildid
    const botToken = process.env.BOT_TOKEN
    let channels = []
    let roles = []
    let botobj = {}
    let erred = false 
    

    await fetch(`https://discord.com/api/guilds/${guildid}/members/834072169507848273`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    let inguild = Object.keys(botobj).includes('mute')

    if (inguild) {
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/channels`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => {if (response.ok) {return response.json()} return Promise.reject()}).then(data => {data.forEach(channel => {if ([0, 2, 13, 15].includes(channel.type)) {channels.push(channel);}})}).catch(error => {erred = true}) 
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/roles`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => {if (response.ok) {return response.json()} return Promise.reject()}).then(data => {data.forEach(role => 
            {const allowed = !(Array.from(Object.keys(role)).includes('tags') && Array.from(Object.keys(role.tags)).includes('bot_id')) && !(role.name == '@everyone')
                if (allowed){
                roles.push(role)
            }
        }
        )
    }
    ).catch(error => {erred = true})   
    } else {
        return {
            redirect: {
              destination: `https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`,
              permanent: false,
            },
          }
    }


    let general = {channel_whitelists: {}, role_whitelists: {}, ignored_words: [], caps_threshold: 120}
    let messageSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 40, timeunit: 'minutes'}
    let emojiSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 20, timeunit: 'minutes'}
    let mentionSpamInfo = {punishments:['Delete message', 'Mute', 'Warn'],maxes:[8,2],  channel_whitelists:{},role_whitelists:{}, points: 6, timeval: 3, timeunit: 'hours'}
    let stickerSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours'}
    let attachmentSpamInfo = {punishments:[],maxes:[5,2],  channel_whitelists:{},role_whitelists:{}, points: 5, timeval: 3, timeunit: 'hours'}
    let linkSpamInfo = {punishments:[],maxes:[6,2],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 2, timeunit: 'hours'}

    let lineBreakInfo = {punishments:[],top:15,points:0,timeunit:'minutes',timeval:30,channel_whitelists:{},role_whitelists:{}}
    let capInfo = {punishments:[],top:99,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}}
    let duplicateMsgInfo = {punishments:[],top:5,points: 4,timeunit:'hours',timeval:2,channel_whitelists:{},role_whitelists:{}}
    let duplicateCharInfo = {punishments:[],top:30,points:5,timeunit:'minutes',timeval:45,channel_whitelists:{},role_whitelists:{}}

    let inviteInfo = {punishments: [], points: 5, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let selfbotInfo = {punishments:['Delete message','Ban'], points:0, timeunit:'minutes',timeval:0,role_whitelists:{}}

    let badWordInfo = [{title: 'slurs', 
                        punishments: [ 'Delete message', 'Warn' ], 
                        availableOptions: ['Delete message', 'Mute','Warn'],
                        words: ['nigger','fag','tranny','trannies','chingchong','ching chang'], 
                        points: 20, 
                        timeval: 0, 
                        timeunit: 'minutes', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0,
                    substring: 1 },

                    ]
    let badLinkInfo = [{title: 'nsfw', 
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
                       {title: 'gory', 
                       punishments: ['Delete message', 'Ban'], 
                       availableOptions: ['Delete message', 'Ban'],
                       words: ['bestgore', 'theync', 'kaotic', 'goregrish', 'crazyshit', 'efukt', 'runthegauntlet', 'ogrishforum'], 
                        points: 0, 
                        timeval: 0,
                        timeunit: 'minutes',
                        whitelistedRoles: {},
                        whitelistedChannels: {}, 
                        duration: 0,
                    substring: 1}]

    let badNickInfo = [{title: 'triggering (substring)',
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
                    }, {title: 'triggering (no substring)',
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
                    }, {title: 'slurs', 
                    punishments: [ 'Warn','Tempban' ],
                    availableOptions: ['Warn','Tempban'],
                    words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'], 
                    points: 20, 
                    timeval: 3, 
                    timeunit: 'days', 
                    whitelistedRoles: {}, 
                    whitelistedChannels: {}, 
                    duration: 0,
                    substring: 1
                    }]
    let badNameInfo = [{title: 'triggering (substring)',
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
                    }, {title: 'triggering (no substring)',
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
                        }, {title: 'slurs', 
                        punishments: [ 'Warn','Tempban' ],
                        availableOptions: ['Warn','Tempban'],
                        words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'], 
                        points: 20, 
                        timeval: 3, 
                        timeunit: 'days', 
                        whitelistedRoles: {}, 
                        whitelistedChannels: {}, 
                        duration: 0,
                        substring: 1}]

    let badStatusInfo = [{title: 'triggering (substring)',
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
                    }, {title: 'triggering (no substring)',
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
                    },{title: 'slurs', 
                    punishments: [ 'Warn','Tempban' ],
                    availableOptions: ['Warn','Tempban'],
                    words: ['nigger', 'fag', 'tranny', 'trannies', 'chingchong', 'ching chang'], 
                    points: 20, 
                    timeval: 3, 
                    timeunit: 'days', 
                    whitelistedRoles: {}, 
                    whitelistedChannels: {}, 
                    duration: 0,
                    substring: 1
                }]


    function checkIfGuildidExists() {
        return new Promise((resolve, reject) => {
            db_pool.query(`SELECT * FROM msg_automod where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }

    await checkIfGuildidExists().then(res => {
        if (res.rows.length > 0) {
            const settings = res.rows[0]
            general = settings.automodgeneral
            if (!Object.keys(general).includes("ignored_words")) {
                general.ignored_words = []
            }
            if (!Object.keys(general).includes("caps_threshold")) {
                general.caps_threshold = 120
            }

            messageSpamInfo = settings.messagespam
            emojiSpamInfo = settings.emojispam
            mentionSpamInfo = settings.mentionspam
            stickerSpamInfo = settings.stickerspam
            attachmentSpamInfo = settings.attachmentspam
            linkSpamInfo = settings.linkspam
            lineBreakInfo = settings.linebreaks
            capInfo = settings.toomanycaps
            duplicateMsgInfo = settings.duplicatemessages
            duplicateCharInfo = settings.duplicatecharacters
            inviteInfo = settings.invites
            selfbotInfo = settings.selfbot
            badWordInfo = settings.badwords.categories
            badLinkInfo = settings.badlinks.categories
            badNickInfo = settings.badnicks.categories.map(c => {if (typeof c == 'string') {return JSON.parse(c)} return c})
            badNameInfo = settings.badnames.categories.map(c => {if (typeof c == 'string') {return JSON.parse(c)} return c})
            badStatusInfo = settings.badstatuses.categories.map(c => {if (typeof c == 'string') {return JSON.parse(c)} return c})
        }
    })

    // await checkIfIdExists('badnicks').then(res => {
    //     if (res.rows.length > 0) {
    //         badNickInfo = res.rows[0].categories
    //     }
    // }).catch(error => {erred = true})

    // await checkIfIdExists('badnames').then(res => {
    //     if (res.rows.length > 0) {
    //         badNameInfo = res.rows[0].categories
    //     }
    // }).catch(error => {erred = true})

    // await checkIfIdExists('badstatuses').then(res => {
    //     if (res.rows.length > 0) {
    //         badStatusInfo = res.rows[0].categories
    //     }
    // }).catch(error => {erred = true})

   
    
    return {
        props: {
            channels: channels,
            roles: roles,
            inguild: inguild,
            generalInfo: general,
            messageSpamInfo: messageSpamInfo,
            emojiSpamInfo: emojiSpamInfo, 
            mentionSpamInfo: mentionSpamInfo, 
            stickerSpamInfo: stickerSpamInfo, 
            attachmentSpamInfo: attachmentSpamInfo, 
            linkSpamInfo: linkSpamInfo,
            lineBreakInfo: lineBreakInfo,
            capInfo: capInfo,
            duplicateMsgInfo: duplicateMsgInfo,
            duplicateCharInfo: duplicateCharInfo,
            inviteInfo: inviteInfo,
            selfbotInfo: selfbotInfo,
            badWordInfo: badWordInfo,
            badLinkInfo: badLinkInfo,
            badNickInfo: badNickInfo,
            badNameInfo: badNameInfo,
            badStatusInfo: badStatusInfo,
            erred: erred
        }
    }
}

export default Automod