import '../styles/globals.css'
import Top from '../components/Top'
import { useEffect, componentDidMount, useState, Suspense, Fragment } from 'react'
import Router, { useRouter } from 'next/router'
import { ListItem, ListItemIcon, ListItemText, Grid, Container, Divider, List, Box, Drawer, Tooltip } from '@material-ui/core'
import { SessionProvider, getSession,signIn }from "next-auth/react"
import Head from 'next/head'
import {icons} from '../components/Automod'
import Link from 'next/link'
import Loader, {HomeLoader} from '../components/Loading'

const links = {"General Settings": 'botsettings', "Automod": 'automod', "Logging":'modlogs', "Autopunish": 'autopunish', "Auto Kick/Ban":'autokickban', "Weblogs": 'weblogs'}

const hover_colors = {
    'autokickban': {
        'General Settings': 'white',
        'Automod': 'white',
        'Logging': 'white',
        'Autopunish': 'white',
        'Auto Kick/Ban': 'lightgray',
    },
    'automod': {
        'General Settings': 'white',
        'Automod': 'lightgray',
        'Logging': 'white',
        'Autopunish': 'white',
        'Auto Kick/Ban': 'white',
    },
    'modlogs': {
        'General Settings': 'white',
        'Automod': 'white',
        'Logging': 'lightgray',
        'Autopunish': 'white',
        'Auto Kick/Ban': 'white',
    },
    'autopunish': {
        'General Settings': 'white',
        'Automod': 'white',
        'Logging': 'white',
        'Autopunish': 'lightgray',
        'Auto Kick/Ban': 'white',
    }
}

const titles = {'automod': 'Automod settings', 'modlogs': 'Action log settings', 'autopunish': 'Autopunish settings', 'autokickban': 'Auto kick/ban settings'}

function URLIsOk(url) {
    return url.includes('automod') || url.includes('autopunish') || url.includes('autokickban') || url.includes('modlogs')
}

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


function getDashboardSection(url) {
    const urls = ['automod', 'autopunish', 'modlogs', 'autokickban']

    for (let i=0; i<4; i++) {
        if (url.includes(urls[i])) {
            return urls[i]
        }
    }
    return ''
}


function MyApp({ Component, pageProps }) {
    const r = useRouter()

    const [session, setSession] = useState({})
    const [loading ,setLoading] = useState(true)
    const [navToDb, setNavToDb] = useState(getDashboardSection(r.route))
    const [pageLoading, setPageLoading] = useState(true)
    
    
    const guildid = r.query.guildid;
    let dashboard_sublink = getDashboardSection(r.route);

    if ((session instanceof Object && Object.keys(session).length == 0)) {
        (async () => {
            await fetch('https://www.amgx-bot.com/api/secure-session').then(response => response.json()).then(data => {setSession(data);}).catch(error => console.log(error))
        })();
    }


    useEffect(() => {(async () => {
        setLoading(false)
        await fetch('https://www.amgx-bot.com/api/secure-session').then(response => response.json()).then(data => setSession(data)).catch(error => console.log(error))
    })();


        const start = (url) => {
            if (URLIsOk(url)) {
                setLoading(true)
                setNavToDb(getDashboardSection(url))
            } else {
                setNavToDb('')
            }
        };
        
        const end = (url) => {
            if (URLIsOk(url)) {
                setLoading(false)
                setNavToDb(getDashboardSection(url))
            } else {
                setNavToDb('')
            }
        };

        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);


        
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        }
    },[])

    useEffect(() => {
        const handleDOMContentLoaded = () => {
            setPageLoading(false)
        };
    
        if (document.readyState === 'loading') {
          // Document is still loading, add an event listener
          document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
        } else {
          // Document is already loaded, run the code immediately
          handleDOMContentLoaded();
        }
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        };
      }, []);



    const body = <>
          {loading ? (
            <Loader fullScreen={false} text={'Fetching data...'} />
          ) : (
            <Component {...pageProps} />
          )}
        </>

    let content;
  
    pageProps.session = session

    if (navToDb.length > 0) {
        if (session instanceof Object) {
            content = <><noscript>you need to enable javascript to run this app</noscript><SessionProvider session={pageProps.session}>
                     <Head>
                        <link rel="icon" href="/favicon.ico" />
                        <title>{titles[dashboard_sublink]}</title>
                        <meta name='description' content='Auto kick/ban settings'></meta>
                    </Head>
                    <Top loggedIn={true} partOfGuild={false} pfp={session.image} name={session.name} signin={() => handleSignIn('servers')}/>
                    <Fragment>
                        
                    <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
                    
                    <Drawer
                    
                    id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: 'calc(100vh - 60px)',position: 'absolute', width: 88}}
                    variant="permanent"
                    anchor="left"
                >
                    <div style={{height: 55}}/>
                    <div style={{height: 55}}/>
                        <List style={{position: 'relative'}}>
                    {['Automod', 'Logging', 'Autopunish','Auto Kick/Ban'].map((text, index) => (
                        <Link href={`/dashboard/${guildid}/${links[text]}`}  key={text}>
                            <Tooltip title={<span style={{ fontSize: 12, height: 18 }}>{text}</span>} enterTouchDelay={0} placement="right" PopperProps={{style: {marginLeft: -56}}}>
                        <ListItem button style={{backgroundColor: hover_colors[navToDb][text]}}>
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
                        {body}
                        </Box>
                    </Box>   
                </Fragment>
                  </SessionProvider></>
                
        } else {
            content = <SessionProvider session={pageProps.session}>
                <Head>
                <link rel="icon" href="/favicon.ico" />
                </Head>
                <Top loggedIn={false} signin={() => handleSignIn('servers')}/>
                <Fragment>
                        
                        <Box className={'uuu'}style={{ display: 'flex', position: 'relative', top:60 }}>
                        
                        <Drawer
                        
                        id="nav" style={{zIndex:2,backgroundColor: 'lightgray', height: 'calc(100vh - 60px)',position: 'absolute', width: 88}}
                        variant="permanent"
                        anchor="left"
                    >
                        <div style={{height: 55}}/>
                        <div style={{height: 55}}/>
                            <List style={{position: 'relative'}}>
                        {['Automod', 'Logging', 'Autopunish','Auto Kick/Ban'].map((text, index) => (
                            <Link href={`/dashboard/${guildid}/${links[text]}`}  key={text}>
                                <Tooltip title={<span style={{ fontSize: 12, height: 18 }}>{text}</span>} enterTouchDelay={0} placement="right" PopperProps={{style: {marginLeft: -56}}}>
                            <ListItem button style={{backgroundColor: hover_colors[navToDb][text]}}>
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
                            {body}
                            </Box>
                        </Box>   
                    </Fragment></SessionProvider>
                
        }
    } else {
        if (session instanceof Object) {
            content = <><noscript>you need to enable javascript to run this app</noscript><SessionProvider session={pageProps.session}>
                     <Head>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Top loggedIn={true} name={session.name} pfp={session.image}  signin={() => handleSignIn('servers')}/>
                  <Component {...pageProps} /></SessionProvider></>
                  
        }
        else {
            content = <SessionProvider session={pageProps.session}>
                <Head>
                <link rel="icon" href="/favicon.ico" />
                </Head>
                <Top loggedIn={false} signin={() => handleSignIn('servers')}/>
              <Component {...pageProps} /></SessionProvider>
              
        }
    }

    let page;

    if (r.route == '/') {
        page = pageLoading ? (
            <HomeLoader fullScreen={true} text={''} />
          ) : (
            content
          )
    } else {
       page = pageLoading ? (
            <Loader fullScreen={true} text={''} />
          ) : (
            content
          )
    }
    
    return page
  
}

export default MyApp
