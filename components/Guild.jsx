import React, {  } from "react";
import { Typography,Grid, Container } from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Link from 'next/link'

function getIcon(guild) {
    if (guild.icon == null) {
        return "/default.png"
    } else {
        return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg`
    }
}


async function hasSession() {
    let session;
    await fetch('/api/secure-session').then(response => response.json()).then(data => session = data);
    return session instanceof Object
}



const useStyles = makeStyles({
    guildCard: {
        '&:hover': {
            backgroundColor: '#e6e6e6'
        }
    }
})

const Guild = (props) => {
    const icons = props.guilds.map(getIcon)

    const styles = useStyles()
    return (
        <div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>Please select a server</Typography>
            <Container maxWidth="xl" style={{position: 'relative', top: 30}}>
            <Grid container spacing={4} style={{ position: 'relative', paddingTop: 20, paddingBottom: 20, backgroundColor: "#ffffff", borderRadius: 5}}>
              {props.guilds.map((guild) => {
                  return <Grid className={styles.guildCard} item xs={12} sm={6} md={3} lg={2} key={guild.name} style={{alignContent: "center", position: 'relative', width: 'calc(100% - 40px)', borderRadius: 10}}>
                      <Link key={guild.name} href={`/dashboard/${guild.id}/automod`} style={{position: 'relative', width: '100%', height: '100%'}}>
                        <div style={{position: 'relative', width: '100%', height: '100%'}}>
                      <img src={icons[props.guilds.indexOf(guild)]} height={150} style={{borderRadius: 75, border: '3px solid gray', position: "relative", left: "calc(50% - 75px)"}} />
                      <Typography style={{fontSize: 15, fontWeight: 700, textAlign: "center"}}>{guild.name}</Typography>
                      </div>
                      </Link>
                  </Grid>
                  
              })}
          </Grid>
          </Container>
        </div>
    )
}

export default Guild
export { hasSession }