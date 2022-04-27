import '../styles/globals.css'
import Top from '../components/Top'
import { useEffect, componentDidMount, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Grid } from '@material-ui/core'
import { SessionProvider, getSession,signIn }from "next-auth/react"
function MyApp({ Component, pageProps }) {
    const [session, setSession] = useState({})
    let loggedIn = false
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession !== null) {
            loggedIn = true
        } else {
            return getsession
        }
}

    useEffect(async () => {
        await fetch('http://localhost:8080/api/auth/session').then(response => response.json()).then(data => setSession(data))
        
    },[])


    console.log(useRouter().query.guildid)



    if (Object.keys(session).length == 3) {
        if (useRouter().query.guildid != undefined) {
            return (<SessionProvider session={pageProps.session}>
                <Top loggedIn={true} partOfGuild={true} pfp={session.user.image} name={session.user.name}signin={() => signIn('discord','localhost:8080/api/auth/callback/discord')}/>
                
              <Component {...pageProps} /></SessionProvider>
              )
        } else {
            return (<SessionProvider session={pageProps.session}>
                <Top loggedIn={true} partOfGuild={false} pfp={session.user.image} name={session.user.name}signin={() => signIn('discord','localhost:8080/api/auth/callback/discord')}/>
                
              <Component {...pageProps} /></SessionProvider>
              )
        }
        
    }
    else {

        return (<SessionProvider session={pageProps.session}>
            <Top loggedIn={false} signin={() => signIn('discord','localhost:8080/api/auth/callback/discord')}/>
          <Component {...pageProps} /></SessionProvider>
          )
    }
  
}

export default MyApp
