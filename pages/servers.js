import { useRouter, Router } from 'next/router'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect, componentDidMount, useState } from 'react'
import Guild from '../components/Guild'
import { GuildFails } from '../components/Fails'
import { Fragment } from 'react'
import Head from 'next/head'
import Loader from '../components/Loading'
import { Grid, Container, Typography } from '@material-ui/core'
import { hasSession } from '../components/Guild'

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


function Guilds(props) {
    const [guilds, setGuilds] = useState([])
    let loggedIn = false
    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn('servers')
        } else {
            loggedIn = true
        }
    }

    useEffect(() => {
        if (guilds.length > 0 && guilds instanceof Array) {
            localStorage.setItem('guilds', JSON.stringify(guilds))
        }
    }, [guilds])

    useEffect(() => {
        getthesession()
        const fetchGuilds = async () => {
            if (props.session instanceof Object) {
                await fetch('/api/find-servers', {
                    method: 'GET'
                }).then(response => {
                    if (!(localStorage.getItem("guilds") == null)) {
                        setGuilds(JSON.parse(localStorage.getItem("guilds")))
                    }
                    if (response.status !== 200) {
                        if (response.status == 401) {
                            handleSignIn('servers')
                        }
    
                    } else {
                        response.json().then(data => setGuilds(data))
                    }
                })
            }
        }
        fetchGuilds();
    }, [])

    if (guilds.length > 0)  {
        return <Fragment>
        <Head>
            <title>My servers</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
        </Head><div id={'blah'} style={{position: 'relative', top: 0}}>
            <Guild guilds={guilds} />
        </div>
        <div style={{height: 100}} />

        </Fragment>
    } else {
        return <Fragment>
        <Head>
            <title>My servers</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
        </Head><div id={'blah'} style={{position: 'relative', top: 0}}>
        <div style={{height: '100%', position: 'relative', left: 20, width: 'calc(100% - 40px)',top: 110}}>
            <Typography style={{fontSize: 25, fontWeight: 700, textAlign: "center"}}>Please select a server</Typography>
            <Container maxWidth="xl" style={{position: 'relative', top: 30}}>
            <Grid container spacing={4} style={{ position: 'relative', paddingTop: 20, paddingBottom: 80, backgroundColor: "#ffffff", borderRadius: 5}}>
              <Loader fullScreen={false} text={'Fetching servers...'} />
          </Grid>
          </Container>
        </div>
        </div>
        <div style={{height: 100}} />

        </Fragment>

    }
        
    }


export default Guilds