import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { MessageActions,MemberActions,Moderations,ServerActions,VCActions,icons } from '../../../components/Modlog'
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Toolbar } from '@material-ui/core'
import Link from 'next/link'

const drawerWidth = 210
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban'}

function Modlog(props) {
    const inguild = props.inguild
    const router = useRouter()
    const guildid = useRouter().query.guildid
    let channelinfo = []
    let channelobj = {}
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
    props.channels.forEach(channel => {channelinfo.push(`${channel.name}`); channelobj[`${channel.name}`]=BigInt(channel.id)})
    let messageChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.messageChannel))
    let memberChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.memberChannel))
    let moderationChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.moderationChannel))
    let serverChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.serverChannel))
    let vcChannelName = Object.keys(channelobj).find(key => channelobj[key] == BigInt(props.messageChannel))

    
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
    <MessageActions channels={channelinfo} channelobj={channelobj} channel={messageChannelName} server={useRouter().query.guildid} actions={props.messageActions}/>
    <MemberActions channels={channelinfo} channelobj={channelobj} channel={memberChannelName} server={useRouter().query.guildid} actions={props.memberActions}/>
    <Moderations channels={channelinfo} channelobj={channelobj} channel={moderationChannelName} server={useRouter().query.guildid} actions={props.moderationActions}/>
    <ServerActions channels={channelinfo} channelobj={channelobj} channel={serverChannelName} server={useRouter().query.guildid} actions={props.serverActions}/>
    <VCActions channels={channelinfo} channelobj={channelobj} channel={vcChannelName} server={useRouter().query.guildid} actions={props.vcActions}/>
    </Grid></Container>
    </Box></Box></>
}

export default Modlog
export async function getStaticPaths(context) {
    return {
        paths: [],
        fallback: 'blocking'
    }
    
}
export async function getStaticProps(context) {
    let botobj = {}
    let channels = []
    let messageChannel = 0
    let messageActions = []
    let memberChannel = 0
    let memberActions = []
    let moderationChannel = 0
    let moderationActions = []
    let serverChannel = 0
    let serverActions = []
    let vcChannel = 0
    let vcActions = []
    const guildid = context.params.guildid
    const botToken = process.env.BOT_TOKEN
    
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
        
    }
    

    const { Pool, Client } = require('pg')
        const client = new Client({
            user:'postgres',
            host: 'localhost',
            database: 'postgres',
            password:'mysecretpassword',
            port:5432
        })

    client.connect()
    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM modlogs where guild_id=$1', [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const row = res.rows[0]
            messageActions = row.message_actions !== null ? row.message_actions : []
            messageChannel = row.message_channel !== null ? row.message_channel : 0
            memberActions = row.member_actions !== null ? row.member_actions : []
            memberChannel = row.member_channel !== null ? row.member_channel : 0
            moderationChannel = row.moderation_channel !== null ? row.moderation_channel : 0
            moderationActions = row.moderations !== null ? row.moderations : []
            serverChannel = row.server_channel !== null ? row.server_channel : 0
            serverActions = row.server_actions !== null ? row.server_actions : []
            vcChannel = row.voicestate_channel !== null ? row.voicestate_channel : 0
            vcActions = row.vc_actions !== null ? row.vc_actions : []
        }
    })
    


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
            vcActions: vcActions
        }
    })
}