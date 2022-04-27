import Bot, {icons} from '../../../components/Bot'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Toolbar } from '@material-ui/core'
import Link from 'next/link'

const drawerWidth = 210
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban'}

function BotSettings(props) {
    const inguild = props.inguild
    const router = useRouter()
    const guildid = useRouter().query.guildid
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
    return <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
    
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
          <Container style={{padding: '20px 0', width: 'calc(100% - 50px)'}} maxWidth="xl"> <Grid container spacing={4} ><Bot prefix={props.prefix} name={props.name} guildid={`${guildid}`}></Bot></Grid></Container></Box></Box>
}

export async function getStaticPaths(context) {
    return {
        paths: [],
        fallback: 'blocking'
    }
    
}
export async function getStaticProps(context) {
    const guildid = context.params.guildid
    let prefix = "a!"
    let name = "AMGX"
    const botToken = process.env.BOT_TOKEN
    
    const { Pool, Client } = require('pg')
        const client = new Client({
            user:'postgres',
            host: 'localhost',
            database: 'postgres',
            password:'mysecretpassword',
            port:5432
        })
    
    let botobj = {}
    await fetch(`https://discord.com/api/guilds/${guildid}/members/834072169507848273`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
        let inguild = (Array.from(Object.keys(botobj)).includes('roles')&&Array.from(Object.keys(botobj)).includes('nick')&&Array.from(Object.keys(botobj)).includes('avatar')&&Array.from(Object.keys(botobj)).includes('premium_since')&&Array.from(Object.keys(botobj)).includes('joined_at')&&Array.from(Object.keys(botobj)).includes('is_pending')&&Array.from(Object.keys(botobj)).includes('pending')&&Array.from(Object.keys(botobj)).includes('user')&&Array.from(Object.keys(botobj)).includes('mute')&&Array.from(Object.keys(botobj)).includes('deaf'))

    client.connect()
    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM bot_settings where guild_id=$1', [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const row = res.rows[0]
            prefix = row.bot_prefix
            name = row.bot_name
        }
    })




    return {
        props: {
            name: name,
            prefix: prefix,
            inguild: inguild
        }
    }
}

export default BotSettings