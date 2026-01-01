import AutoKickBan from '../../../components/AutoKickBan'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'
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


function AutoKicker(props) {
    const router = useRouter()
    const guildid = router.query.guildid
    const inguild = props.inguild
    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn(`/dashboard/${guildid}/autokickban`)
        }
    }
    useEffect(async ()=>{
        getthesession()
        
        if (!JSON.parse(localStorage.getItem("guilds")).map(guild => guild.id).includes(guildid)) {
            router.push('/')
        }
        else if (!inguild && !props.erred) {
            router.push(`https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`)
        }
    },[]);
    const colors = {'General Settings': 'white','Automod': 'white','Logging': 'white','Autopunish': 'white','Auto Kick/Ban': 'lightgray','Weblogs': 'white'}
    if (!props.erred) {
    return <AutoKickBan server={guildid} kickRules={props.kickRules} banRules={props.banRules} usrn={'Press enter to add a username'} stsn={'Press enter to add a status'}/>

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
    let erred = false
    let botobj = {}


    await fetch(`https://discord.com/api/guilds/${guildid}/channels`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            }
        }).then(response => response.json()).then(data => {botobj = data})
    
    let inguild = botobj instanceof Array

    if (!inguild) {
        return {
            redirect: {
              destination: `https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot&guild_id=${guildid}`,
              permanent: false,
            },
          }
    }
    
    const badProfilesSub = ['hitler', 'nazi', 'adolf', 'holocaust', 'auschwitz', 'rapist', 'porn', 'molest', 'traffick', 'pedo', 'paedo']
    const badProfilesNosub = ['rape', 'raping', 'sex']

    let kickRules = []
    let banRules = [{"type": "username", "timeVal": 24, "timeUnit": "hours", "usernames": badProfilesSub, "statuses": [], substring: 1},
                    {"type": "username", "timeVal": 24, "timeUnit": "hours", "usernames": badProfilesNosub, "statuses": [], substring: 0},
                    {"type": "status", "timeVal": 24, "timeUnit": "hours", "usernames": [], "statuses": badProfilesSub, substring: 1},
                    {"type": "status", "timeVal": 24, "timeUnit": "hours", "usernames": [], "statuses": badProfilesNosub, substring: 0},
                ]
    
    function checkIfIdExists() {
        return new Promise((resolve, reject) => {
            db_pool.query(`SELECT * FROM autokickban where guild_id=$1`, [guildid], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }

    await checkIfIdExists().then(res => {
        if (res.rows.length > 0) {
            const { kickrules, banrules } = res.rows[0]
            if (kickrules !== null) {
                kickRules = kickrules
            }
            if (banrules !== null) {
                banRules = banrules
            }
        }
    }).catch(error => {erred = true})

    return {
        props: {
            inguild: inguild,
            kickRules: kickRules,
            banRules: banRules,
            erred: erred
        }
    }

}

export default AutoKicker