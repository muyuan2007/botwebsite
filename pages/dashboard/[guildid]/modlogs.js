import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { MessageActions,MemberActions,Moderations,ServerActions,VCActions } from '../../../components/Modlog'
import { Grid, Container } from '@material-ui/core'
import { DatabaseFails } from '../../../components/Fails'
import Head from 'next/head'
import { hasSession } from '../../../components/Guild'
import db_pool from '../../../components/db_pool'

const drawerWidth = 210
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };

function Modlog(props) {
    const inguild = props.inguild
    const router = useRouter()
    const guildid = useRouter().query.guildid
    const [id, changeId] = useState(0)
    let channelinfo = []
    let channelobj = {}
    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn(`/dashboard/${guildid}/modlogs`)
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
    
    props.channels.forEach(channel => {channelinfo.push(`${channel.name}`); channelobj[`${channel.name}`]=BigInt(channel.id)})
    let messageChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.messageChannel))
    let memberChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.memberChannel))
    let moderationChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.moderationChannel))
    let serverChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.serverChannel))
    let vcChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.vcChannel))
    
    if (typeof messageChannelName != 'string') {
        messageChannelName = ''
    }
    if (typeof memberChannelName != 'string') {
        memberChannelName = ''
    }
    if (typeof moderationChannelName != 'string') {
        moderationChannelName = ''
    }
    if (typeof serverChannelName != 'string') {
        serverChannelName = ''
    }
    if (typeof vcChannelName != 'string') {
        vcChannelName = ''
    }
    const colors = {'General Settings': 'white','Automod': 'white','Logging': 'lightgray','Autopunish': 'white','Auto Kick/Ban': 'white','Weblogs': 'white'}
    if (!props.erred) {
        return <Container style={{padding: '20px 0', width: 'calc(100% - 50px)'}} maxWidth="xl"> <Grid container spacing={4} >
        <MessageActions uid={id} channels={channelinfo} channelobj={channelobj} channel={messageChannelName} server={guildid} actions={props.messageActions}/>
        <MemberActions uid={id} channels={channelinfo} channelobj={channelobj} channel={memberChannelName} server={guildid} actions={props.memberActions}/>
        <Moderations uid={id} channels={channelinfo} channelobj={channelobj} channel={moderationChannelName} server={guildid} actions={props.moderationActions}/>
        <ServerActions uid={id} channels={channelinfo} channelobj={channelobj} channel={serverChannelName} server={guildid} actions={props.serverActions}/>
        <VCActions uid={id} channels={channelinfo} channelobj={channelobj} channel={vcChannelName} server={guildid} actions={props.vcActions}/>
        </Grid></Container>
    } else {
        return <>
        <Head>
            <title>Failed to fetch server info</title>
        </Head>
        <DatabaseFails /></>
    }
    
}

export default Modlog

export async function getServerSideProps(context) {
    const logactions = {"Message Events":["Message Deleted", "Message Edited", "Message Bulk Deletion"], "Member Events":[
        "Username Changed","Avatar Changed", "Nickname Changed", "Roles Changed", "Member Joined", 
        "Member Left"], "Moderation Events":["Member Warned", "Infraction Removed", "Member Muted","Member Unmuted", "Member Kicked", "Member Tempbanned", 
        "Member Banned","Member Unbanned"], "Server Changes":["Emoji Added","Emoji Updated","Emoji Deleted","Channel Created","Channel Updated","Channel Deleted"
        , "Role Created","Role Updated","Role Deleted","Server Name Changed","Server Icon Changed","Discovery Splash Changed","AFK Channel Changed","System Channel Changed","Default Notifications Changed","AFK Timeout Changed","Bot Added",
        "Bot Removed", "Invite Splash Changed","Banner Changed","Explicit Filter Changed",
        "Verification Level Changed","Invite Created","Invite Deleted","MFA Changed","Server Owner Changed"], "Voice Channel Events":["Member Joined VC",
        "Member Left VC","Member Moved"]}
    let botobj = {}
    let channels = []
    let messageChannel = 0
    let messageActions = logactions["Message Events"]
    let memberChannel = 0
    let memberActions = logactions["Member Events"]
    let moderationChannel = 0
    let moderationActions = logactions["Moderation Events"]
    let serverChannel = 0
    let serverActions = logactions["Server Changes"]
    let vcChannel = 0
    let vcActions =logactions["Voice Channel Events"]
    let erred = false

    const guildid = context.params.guildid
    const botToken = process.env.BOT_TOKEN
    
    await fetch(`https://discord.com/api/guilds/${guildid}/members/834072169507848273`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    let inguild = 'mute' in botobj
    
    if (inguild) {
        await fetch(`https://discord.com/api/v8/guilds/${guildid}/channels`,{
            headers: {
                Authorization: `Bot ${botToken}`
              }
        }).then(response => response.json()).then(data => {data.forEach(channel => {if (channel.type === 0) {channels.push(channel);}})})
    } else {
        return {
            redirect: {
              destination: `https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`,
              permanent: false,
            },
          }
    }

    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            db_pool.query('SELECT * FROM modlogs where guild_id=$1', [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const row = res.rows[0]
            messageActions = row.message_actions !== null ? row.message_actions : logactions['Message Events']
            messageChannel = row.message_channel !== null ? row.message_channel : 0
            memberActions = row.member_actions !== null ? row.member_actions : logactions['Member Events']
            memberChannel = row.member_channel !== null ? row.member_channel : 0
            moderationChannel = row.moderation_channel !== null ? row.moderation_channel : 0
            moderationActions = row.moderations !== null ? row.moderations : logactions['Moderation Events']
            serverChannel = row.server_channel !== null ? row.server_channel : 0
            serverActions = row.server_actions !== null ? row.server_actions : logactions['Server Changes']
            vcChannel = row.voicestate_channel !== null ? row.voicestate_channel : 0
            vcActions = row.vc_actions !== null ? row.vc_actions : logactions['Voice Channel Events']
        }
    }).catch(error => {erred = true})
    

    return ({
        props: {
            inguild: inguild,
            channels: channels,
            messageActions: messageActions,
            messageChannel: messageChannel,
            memberActions: memberActions,
            memberChannel: memberChannel,
            moderationActions: moderationActions,
            moderationChannel: moderationChannel,
            serverChannel: serverChannel,
            serverActions: serverActions,
            vcChannel: vcChannel,
            vcActions: vcActions,
            erred: erred
        }
    })
}