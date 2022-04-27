import { icons, General,SpamAutomodSet,NABasedAutomodSet,TAAutomodSet,Selfbot,BlacklistBasedSet,CatProfileBasedSet,ProfileTAAutomodSet } from '../../../components/Automod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Toolbar } from '@material-ui/core'
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban'}

const drawerWidth = 210
function Automod(props) {
    

    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','localhost:3000/api/auth/callback/discord')
        }
    }
    useEffect(async ()=>{
        let myguilds = []
        getthesession()
        let accesstoken = ''
        var token = fetch('http://localhost:8080/api/auth/session').then(response => response.json()).then((data) => data.accessToken).then((data) => {return data})
        await token.then(data => accesstoken=data)
        var guilds = fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
        }).then(response => response.json()).then((data) => {let guildinfo = []; Array.from(data).forEach(guild => {if (guild.permissions >= 1312280161) {guildinfo.push(BigInt(guild.id))}}); return guildinfo})
        
        await guilds.then(data => myguilds=data)

        if (!myguilds.includes(BigInt(guildid))) {
            router.push('http://localhost:8080')
        }
        else if (!inguild) {
            router.push(`https://discord.com/oauth2/authorize?&client_id=834072169507848273&scope=bot&permissions=8&guild_id=${guildid}&response_type=code&redirect_uri=http://localhost:8080/api/auth/callback/discord`)
        }
    },[])

    const roles = props.roles
    const channels = props.channels
    let channelinfo = []
    let roleinfo = []
    const roleobj = {}
    const channelobj = {}
    channels.forEach(channel => {channelinfo.push(`${channel.name}`); channelobj[`${channel.name}`]=channel.id})
    roles.forEach(role => {roleinfo.push(`${role.name}`); roleobj[`${role.name}`]=role.id})

    const muteRoleName = Object.keys(props.generalInfo.muterole).find(element => element == Object.values(props.generalInfo.muterole)[0])
    let muteObj = {}
    muteObj[muteRoleName] = Object.values(props.generalInfo.muterole)[0]
    return <>
    <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
    
    <Drawer
    
        id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: '100vw',position: 'absolute', width: drawerWidth}}
        variant="permanent"
        anchor="left"
      >
          <div style={{height: 55}}/>
          <div style={{height: 55}}/>
            <List style={{position: 'relative'}}>
          {['General Settings', 'Automod', 'Logging', 'Autopunish','Auto Kick/Ban'].map((text, index) => (
              <Link href={`/dashboard/${guildid}/${links[text]}`}>
            <ListItem button key={text}>
              <ListItemIcon>
                {icons[text]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
        </Drawer>
      <Box id={'settings'}
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' } }
        style={{zIndex:1,width: `calc(100% - ${drawerWidth}px)`, position:'absolute', left: drawerWidth, top: 50}}
      >
          <Container style={{padding: '20px 0', width: 'calc(100% - 50px)'}} maxWidth="xl"> <Grid container spacing={4} >
    <General table={'automodgeneral'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} channel_whitelists={props.generalInfo.channel_whitelists} role_whitelists={props.generalInfo.role_whitelists} muterole={props.generalInfo.muterole}/>
    <SpamAutomodSet table={'messagespam'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Message Spam" bottomoft="Messages" offUnit="Seconds" textWidth1={101.69} punishments={props.messageSpamInfo.punishments} maxes={props.messageSpamInfo.maxes} points={props.messageSpamInfo.points} duration={props.messageSpamInfo.duration} timeunit={props.messageSpamInfo.timeunit} timeval={props.messageSpamInfo.timeval} channel_whitelists={props.messageSpamInfo.channel_whitelists} role_whitelists={props.messageSpamInfo.role_whitelists}></SpamAutomodSet>
    <SpamAutomodSet table={'emojispam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Emoji Spam' bottomoft={'Emojis'} offUnit='Seconds'textWidth1={76.23} punishments={props.emojiSpamInfo.punishments} maxes={props.emojiSpamInfo.maxes} points={props.emojiSpamInfo.points} duration={props.emojiSpamInfo.duration} timeunit={props.emojiSpamInfo.timeunit} timeval={props.emojiSpamInfo.timeval} channel_whitelists={props.emojiSpamInfo.channel_whitelists} role_whitelists={props.emojiSpamInfo.role_whitelists}/>
    <SpamAutomodSet table={'mentionspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Mention Spam' bottomoft={'Mentions'} offUnit='Seconds'textWidth1={94.92} punishments={props.mentionSpamInfo.punishments} maxes={props.mentionSpamInfo.maxes} points={props.mentionSpamInfo.points} duration={props.mentionSpamInfo.duration} timeunit={props.mentionSpamInfo.timeunit} timeval={props.mentionSpamInfo.timeval} channel_whitelists={props.mentionSpamInfo.channel_whitelists} role_whitelists={props.mentionSpamInfo.role_whitelists}/>
    <SpamAutomodSet table={'stickerspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Sticker Spam' bottomoft={'Stickers'} offUnit='Seconds'textWidth1={85.41} punishments={props.stickerSpamInfo.punishments} maxes={props.stickerSpamInfo.maxes} points={props.stickerSpamInfo.points} duration={props.stickerSpamInfo.duration} timeunit={props.stickerSpamInfo.timeunit} timeval={props.stickerSpamInfo.timeval} channel_whitelists={props.stickerSpamInfo.channel_whitelists} role_whitelists={props.stickerSpamInfo.role_whitelists} />
    <SpamAutomodSet table={'attachmentspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Attachment Spam' bottomoft={'Attachments'} offUnit='Seconds'textWidth1={120.23} punishments={props.attachmentSpamInfo.punishments} maxes={props.attachmentSpamInfo.maxes} points={props.attachmentSpamInfo.points} duration={props.attachmentSpamInfo.duration} timeunit={props.attachmentSpamInfo.timeunit} timeval={props.attachmentSpamInfo.timeval} channel_whitelists={props.attachmentSpamInfo.channel_whitelists} role_whitelists={props.attachmentSpamInfo.role_whitelists}/>
    <SpamAutomodSet table={'linkspam'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype='Link Spam' bottomoft={'Links'} offUnit='Seconds'textWidth1={65.56} punishments={props.linkSpamInfo.punishments} maxes={props.linkSpamInfo.maxes} points={props.linkSpamInfo.points} duration={props.linkSpamInfo.duration} timeunit={props.linkSpamInfo.timeunit} timeval={props.linkSpamInfo.timeval} channel_whitelists={props.linkSpamInfo.channel_whitelists} role_whitelists={props.linkSpamInfo.role_whitelists}/>
    <NABasedAutomodSet table={'linebreaks'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Line Breaks'} oftdesc={'line breaks'} textWidth1={87.47} punishments={props.lineBreakInfo.punishments} top={props.lineBreakInfo.top} points={props.lineBreakInfo.points} duration={props.lineBreakInfo.duration} timeunit={props.lineBreakInfo.timeunit} timeval={props.lineBreakInfo.timeval} channel_whitelists={props.lineBreakInfo.channel_whitelists} role_whitelists={props.lineBreakInfo.role_whitelists}/>
    <NABasedAutomodSet table={'toomanycaps'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Too Many Caps'} oftdesc={'% caps'} textWidth1={60.89} punishments={props.capInfo.punishments} top={props.capInfo.top} points={props.capInfo.points} duration={props.capInfo.duration} timeunit={props.capInfo.timeunit} timeval={props.capInfo.timeval} channel_whitelists={props.capInfo.channel_whitelists} role_whitelists={props.capInfo.role_whitelists}/>
    <NABasedAutomodSet table={'duplicatemessages'} server={guildid} channelobj={channelobj} roleobj={roleobj} roles={roleinfo} channels={channelinfo} offtype={'Duplicate Messages'} oftdesc={'repeated messages'} textWidth1={152.55} punishments={props.duplicateMsgInfo.punishments} top={props.duplicateMsgInfo.top} points={props.duplicateMsgInfo.points} duration={props.duplicateMsgInfo.duration} timeunit={props.duplicateMsgInfo.timeunit} timeval={props.duplicateMsgInfo.timeval} channel_whitelists={props.duplicateMsgInfo.channel_whitelists} role_whitelists={props.duplicateMsgInfo.role_whitelists}/>
    <NABasedAutomodSet table={'duplicatecharacters'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Duplicate Characters" oftdesc="repeated characters" textWidth1={154.88} punishments={props.duplicateCharInfo.punishments} top={props.duplicateCharInfo.top} points={props.duplicateCharInfo.points} duration={props.duplicateCharInfo.duration} timeunit={props.duplicateCharInfo.timeunit} timeval={props.duplicateCharInfo.timeval} channel_whitelists={props.duplicateCharInfo.channel_whitelists} role_whitelists={props.duplicateCharInfo.role_whitelists}></NABasedAutomodSet>
    <TAAutomodSet table={'invites'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Invites" punishments={props.inviteInfo.punishments} points={props.inviteInfo.points} duration={props.inviteInfo.duration} timeunit={props.inviteInfo.timeunit} timeval={props.inviteInfo.timeval} channel_whitelists={props.inviteInfo.channel_whitelists} role_whitelists={props.inviteInfo.role_whitelists}></TAAutomodSet>
    <TAAutomodSet table={'nsfwcontent'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="NSFW Content" punishments={props.nsfwInfo.punishments} points={props.nsfwInfo.points} duration={props.nsfwInfo.duration} timeunit={props.nsfwInfo.timeunit} timeval={props.nsfwInfo.timeval} channel_whitelists={props.nsfwInfo.channel_whitelists} role_whitelists={props.nsfwInfo.role_whitelists}></TAAutomodSet>
    <TAAutomodSet table={'hatespeech'} channelobj={channelobj} roleobj={roleobj} server={guildid} roles={roleinfo} channels={channelinfo} offtype="Hate Speech" punishments={props.hateSpeechInfo.punishments} points={props.hateSpeechInfo.points} duration={props.hateSpeechInfo.duration} timeunit={props.hateSpeechInfo.timeunit} timeval={props.hateSpeechInfo.timeval} channel_whitelists={props.hateSpeechInfo.channel_whitelists} role_whitelists={props.hateSpeechInfo.role_whitelists}></TAAutomodSet>
    <Selfbot server={guildid} roleobj={roleobj} roles={roleinfo} offtype="Selfbot Detection" punishments={props.selfbotInfo.punishments} points={props.selfbotInfo.points} duration={props.selfbotInfo.duration} timeunit={props.selfbotInfo.timeunit} timeval={props.selfbotInfo.timeval} role_whitelists={props.selfbotInfo.role_whitelists}/>
    <BlacklistBasedSet table={'badwords'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Words" categoryName="Word categories" placehold="Press enter to add a word" categories={props.badWordInfo}></BlacklistBasedSet>
    <BlacklistBasedSet table={'badlinks'} server={guildid} roles={roleinfo} channelobj={channelobj} roleobj={roleobj} channels={channelinfo} offtype="Bad Links" categoryName="Link categories" placehold="Press enter to add a link" categories={props.badLinkInfo}></BlacklistBasedSet>
    <CatProfileBasedSet table={'badnicks'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Nicknames" categoryName="Nickname categories" placehold="Press enter to add a nickname" categories={props.badNickInfo}></CatProfileBasedSet>
    <CatProfileBasedSet table={'badnames'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Usernames" categoryName="Username categories" placehold="Press enter to add a username" categories={props.badNameInfo}></CatProfileBasedSet>
    <CatProfileBasedSet table={'badstatuses'} server={guildid} roles={roleinfo} roleobj={roleobj} offtype="Bad Custom Statuses" categoryName="Status categories" placehold="Press enter to add a status" categories={props.badStatusInfo}></CatProfileBasedSet>
    <ProfileTAAutomodSet table={'nsfwpfp'} roleobj={roleobj} server={guildid} roles={roleinfo} offtype="NSFW Avatars" punishments={props.nsfwPfpInfo.punishments} points={props.nsfwPfpInfo.points} duration={props.nsfwPfpInfo.duration} timeunit={props.nsfwPfpInfo.timeunit} timeval={props.nsfwPfpInfo.timeval} role_whitelists={props.nsfwPfpInfo.role_whitelists}></ProfileTAAutomodSet>
    </Grid></Container>
      </Box>
    </Box>
    
    </>
}

export async function getStaticPaths(context) {
    return {
        paths: [],
        fallback: 'blocking'
    }
    
}

export async function getStaticProps(context) {
    const guildid = context.params.guildid
    const botToken = process.env.BOT_TOKEN
    let channels = []
    let roles = []
    let botobj = {}
    const { Pool, Client } = require('pg')
    const client = new Client({
        user:'postgres',
        host: 'localhost',
        database: 'postgres',
        password:'mysecretpassword',
        port:5432
    })
    client.connect()

    await fetch(`https://discord.com/api/guilds/${guildid}/members/834072169507848273`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    let inguild = (Array.from(Object.keys(botobj)).includes('roles')&&Array.from(Object.keys(botobj)).includes('nick')&&Array.from(Object.keys(botobj)).includes('avatar')&&Array.from(Object.keys(botobj)).includes('premium_since')&&Array.from(Object.keys(botobj)).includes('joined_at')&&Array.from(Object.keys(botobj)).includes('is_pending')&&Array.from(Object.keys(botobj)).includes('pending')&&Array.from(Object.keys(botobj)).includes('user')&&Array.from(Object.keys(botobj)).includes('mute')&&Array.from(Object.keys(botobj)).includes('deaf'))

    if (inguild) {
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/channels`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => response.json()).then(data => {data.forEach(channel => {if (channel.type === 0) {channels.push(channel);}})})
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/roles`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => response.json()).then(data => {data.forEach(role => 
            {const allowed = !(Array.from(Object.keys(role)).includes('tags') && Array.from(Object.keys(role.tags)).includes('bot_id')) && !(role.name == '@everyone')
                if (allowed){
                roles.push(role)
            }
        }
        )
    }
    )
        
    }
    let general = {channel_whitelists: {}, role_whitelists: {}, muterole: {}}
    let messageSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let emojiSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let mentionSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let stickerSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let attachmentSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let linkSpamInfo = {punishments:[],maxes:[0,0],  channel_whitelists:{},role_whitelists:{}, points: 0, timeval: 0, timeunit: 'minutes'}
    let lineBreakInfo = {punishments:[],top:0,points:0,timeunit:'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let capInfo = {punishments:[],top:0,points:0,timeunit:'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let duplicateMsgInfo = {punishments:[],top:0,points:0,timeunit:'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let duplicateCharInfo = {punishments:[],top:0,points:0,timeunit:'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let inviteInfo = {punishments: [], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let nsfwInfo = {punishments: [], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let hateSpeechInfo = {punishments: [], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    let selfbotInfo = {punishments:[], points:0, timeunit:'minutes',timeval:0,role_whitelists:{}}
    let badWordInfo = []
    let badLinkInfo = []
    let badNickInfo = []
    let badNameInfo = []
    let badStatusInfo = []
    let nsfwPfpInfo = {punishments: [], points: 0, timeunit: 'minutes',timeval:0,channel_whitelists:{},role_whitelists:{}}
    function checkIfIdExists(table) {
        return new Promise((resolve, reject) => {
            client.query(`SELECT * FROM ${table} where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists('automodgeneral').then(res => {
        if (res.rows.length > 0) {
            general = res.rows[0]
        }
    }  
    )

    await checkIfIdExists('messagespam').then(res => {
        if (res.rows.length > 0) {
            messageSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('emojispam').then(res => {
        if (res.rows.length > 0) {
            emojiSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('mentionspam').then(res => {
        if (res.rows.length > 0) {
            mentionSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('stickerspam').then(res => {
        if (res.rows.length > 0) {
            stickerSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('attachmentspam').then(res => {
        if (res.rows.length > 0) {
            attachmentSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('linkspam').then(res => {
        if (res.rows.length > 0) {
            linkSpamInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('linebreaks').then(res => {
        if (res.rows.length > 0) {
            lineBreakInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('toomanycaps').then(res => {
        if (res.rows.length > 0) {
            capInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('duplicatemessages').then(res => {
        if (res.rows.length > 0) {
            duplicateMsgInfo = res.rows[0]
        }
    }  
    )
    await checkIfIdExists('duplicatecharacters').then(res => {
        if (res.rows.length > 0) {
            duplicateCharInfo = res.rows[0]
        }
    }  
    )

    await checkIfIdExists('invites').then(res => {
        if (res.rows.length > 0) {
            inviteInfo = res.rows[0]
        }
    })
    await checkIfIdExists('nsfwcontent').then(res => {
        if (res.rows.length > 0) {
            nsfwInfo = res.rows[0]
        }
    })
    await checkIfIdExists('hatespeech').then(res => {
        if (res.rows.length > 0) {
            hateSpeechInfo = res.rows[0]
        }
    })
    await checkIfIdExists('selfbot').then(res => {
        if (res.rows.length > 0) {
            selfbotInfo = res.rows[0]
        }
    })
    await checkIfIdExists('badwords').then(res => {
        if (res.rows.length > 0) {
            badWordInfo = res.rows[0].categories
        }
    })
    await checkIfIdExists('badlinks').then(res => {
        if (res.rows.length > 0) {
            badLinkInfo = res.rows[0].categories
        }
    })
    await checkIfIdExists('badnicks').then(res => {
        if (res.rows.length > 0) {
            badNickInfo = res.rows[0].categories
        }
    })
    await checkIfIdExists('badnames').then(res => {
        if (res.rows.length > 0) {
            badNameInfo = res.rows[0].categories
        }
    })
    await checkIfIdExists('badstatuses').then(res => {
        if (res.rows.length > 0) {
            badStatusInfo = res.rows[0].categories
        }
    })
    await checkIfIdExists('nsfwpfp').then(res => {
        if (res.rows.length > 0) {
            nsfwPfpInfo = res.rows[0]
        }
    })

    

    
        

    

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
            nsfwInfo: nsfwInfo,
            hateSpeechInfo: hateSpeechInfo,
            selfbotInfo: selfbotInfo,
            badWordInfo: badWordInfo,
            badLinkInfo: badLinkInfo,
            badNickInfo: badNickInfo,
            badNameInfo: badNameInfo,
            badStatusInfo: badStatusInfo,
            nsfwPfpInfo: nsfwPfpInfo
        }
    }
}

export default Automod