import Autopunish from "../../../components/Autopunish";
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { Grid, Container } from '@material-ui/core'
import { DatabaseFails } from "../../../components/Fails";
import Head from 'next/head'
import { hasSession } from '../../../components/Guild'
import db_pool from "../../../components/db_pool";

const drawerWidth = 210
const links = { "General Settings": 'botsettings', "Automod": 'automod', "Logging": 'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban": 'autokickban', "Weblogs": 'weblogs' }

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


function Autopunisher(props) {
    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn(`/dashboard/${guildid}/autopunish`)
        }
    }
    useEffect(async () => {
        getthesession()

        if (!JSON.parse(localStorage.getItem("guilds")).map(guild => guild.id).includes(guildid)) {
            router.push('/')
        }
        else if (!inguild) {
            router.push(`https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`)
        }
    }, []);

    const colors = { 'General Settings': 'white', 'Automod': 'white', 'Logging': 'white', 'Autopunish': 'lightgray', 'Auto Kick/Ban': 'white', 'Weblogs': 'white' }
    if (!props.erred) {
        return <Container style={{ padding: '20px 0', width: 'calc(100% - 50px)' }} maxWidth="xl"> <Grid container spacing={4} ><Autopunish guildid={guildid} rules={props.rules} /></Grid></Container>
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
    let rules = [{'type':"mute", "durationType": "hours", "duration": 6, "threshold": 15},{'type':"kick", "durationType": "minutes", "duration": 1, "threshold": 30},{'type':"tempban", "durationType": "days", "duration": 3, "threshold": 45},{'type':"ban", "durationType": "minutes", "duration": 1, "threshold": 60}]
    const botToken = process.env.BOT_TOKEN
    let erred = false
    
    let members = []
    let botobj = {}
    await fetch(`https://discord.com/api/guilds/${guildid}/channels`, {
        headers: {
            Authorization: `Bot ${botToken}`,
        }
    }).then(response => response.json()).then(data => { botobj = data })

    let inguild = botobj instanceof Array

    if (!inguild) {
        return {
            redirect: {
              destination: `https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`,
              permanent: false,
            },
          }
    }

    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            db_pool.query(`SELECT * FROM autopunish where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })

        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const row = res.rows[0]
            rules = row.rules
        }
    }).catch(error => { erred = true })


    return {
        props: {
            inguild: inguild,
            rules: rules,
            members: members,
            erred: erred
        }
    }
}
export default Autopunisher