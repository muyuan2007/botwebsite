import Bot from '../../../components/Bot'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Tooltip } from '@material-ui/core'
import Link from 'next/link'
import { icons } from '../../../components/Automod'
import { DatabaseFails } from '../../../components/Fails'
import { Fragment } from 'react'
import Head from 'next/head'
import db_pool from '../../../components/db_pool'

const drawerWidth = 210
const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

function BotSettings(props) {
    const inguild = props.inguild
    const router = useRouter()
    const guildid = useRouter().query.guildid
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','https://www.amgx-bot.com/api/auth/callback/discord')
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
    const colors = {'General Settings': 'lightgray','Automod': 'white','Logging': 'white','Autopunish': 'white','Auto Kick/Ban': 'white','Weblogs': 'white'}
    if (!props.erred) {
        
        return <Fragment><Head>
            <title>Bot settings</title>
            <meta name='description' content='Bot general settings'></meta>
            </Head><Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
    
        <Drawer
        
            id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: 'calc(100vh - 60px)',position: 'absolute', width: 88}}
            variant="permanent"
            anchor="left"
          >
              <div style={{height: 55}}/>
              <div style={{height: 55}}/>
                <List style={{position: 'relative'}}>
              {['General Settings', 'Automod', 'Logging', 'Autopunish','Auto Kick/Ban'].map((text, index) => (
                  <Link href={`/dashboard/${guildid}/${links[text]}`}  key={text}>
                <Tooltip title={<span style={{ fontSize: 12, height: 18 }}>{text}</span>} enterTouchDelay={0} placement="right" PopperProps={{style: {marginLeft: -56}}}>
                <ListItem button style={{backgroundColor: colors[text]}}>
                  <ListItemIcon>
                    {icons[text]}
                  </ListItemIcon>
                </ListItem>
                </Tooltip>
                </Link>
              ))}
            </List>
            </Drawer>
          <Box id={'settings'}
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default' } }
            style={{zIndex:1,width: `calc(100% - 88px)`, position:'absolute', left: 88, top: 50}}
          >
              <Container style={{padding: '20px 0', width: 'calc(100% - 50px)'}} maxWidth="xl"> <Grid container spacing={4} >
                  <Bot prefix={props.prefix} name={props.name} guildid={`${guildid}`} ></Bot>
                  </Grid></Container></Box></Box>
                  </Fragment>
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
    let prefix = "a!"
    let name = "AMGX"
    let erred = false
    const botToken = process.env.BOT_TOKEN
    const { Pool, Client } = require('pg')
    const client = new Client({
        user:process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password:process.env.DB_PASS,
        port:process.env.DB_PORT
    })
    let botobj = {}
    
    await fetch(`https://discord.com/api/guilds/${guildid}/channels`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    let inguild = botobj instanceof Array
    

    function checkIfIdExists(t) {
        return new Promise((resolve, reject) => {
            db_pool.query(`SELECT * FROM ${t} where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists('bot_settings').then(res => {
        if (res.rows.length > 0) {
            const row = res.rows[0]
            prefix = row.bot_prefix
            name = row.bot_name
        }
    }).catch(error => {console.log(error); erred = true})



    return {
        props: {
            name: name,
            prefix: prefix,
            inguild: inguild,
            erred: erred
        }
    }
}

export default BotSettings