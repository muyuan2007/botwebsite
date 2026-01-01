import Top from '../components/Top'
import { getSession, useSession, signIn, signOut } from 'next-auth/react'
import Features, {TopPart} from '../components/Home'
import { Fragment } from 'react'
import Head from 'next/head'

const topDivHeight = 1100;
const divDiff = 110;
const difDiff2 = 50;

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


function HomeP(props) {
    const { data: session } = useSession()
    if (props.session instanceof Object) {
            return  <Fragment>
                <Head>
                    <title>AMGX Dashboard</title>
                    <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
                </Head>
                <div style={{height: '100%', backgroundImage: 'url(/background.png)', backgroundColor: '#80A3C4'}}>
            <div style={{position: 'relative', top: divDiff}}>
         <TopPart loggedIn={true} signin={() => handleSignIn('servers')}/>
         <div style={{height: difDiff2}}></div>
         <Features />
         </div>
         </div>
         </Fragment>
    } else {
        return <Fragment >
        <Head>
            <title>AMGX Dashboard</title>
            <meta name="description" content='AMGX is a powerful moderation discord bot that features automod, logging, auto kick/ban, and autopunish'></meta>
            <link rel="icon" href="/boticon.ico" />
        </Head><div style={{height: '100%', backgroundImage: 'url(/background.png)', backgroundColor: '#80A3C4'}}>
            <div style={{position: 'relative', top: divDiff}}>
            <TopPart loggedIn={false} signin={() => handleSignIn('servers')}/>
            <div style={{height: difDiff2}}></div>
            <Features/>
            </div>
            </div>
            </Fragment>
    }
}


export default HomeP