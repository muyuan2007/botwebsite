import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import { Fragment } from 'react'
import Head from 'next/head'
import { getSession, signIn } from 'next-auth/react'
import { Container, Grid } from '@material-ui/core'
import { hasSession } from '../components/Guild'

const handleSignIn = async (url) => {
    await signIn("discord", {
      callbackUrl: `/${url}`,
    });
  };


function FeedbackPage(props) {
    const [height, setHeight] = useState(0)

    const getthesession = async () => {
        const loggedIn = await hasSession()
        if (!loggedIn) {
            handleSignIn('feedback')
        }
    }


    useEffect(() => {
        getthesession()

    }, [])
    return <Fragment>
        <Head>
            <title>Feedback for AMGX</title>
            <meta name="description" content='This is where you can give feedback for AMGX!'></meta>
        </Head>
        <div style={{ position: 'relative', top: 110 }}>
        <Container style={{ padding: '20px 0', width: 'calc(100% - 100px)' }} maxWidth="xl"> <Grid container spacing={4} >
            <Feedback session={props.session}/>
            </Grid></Container>
        </div>
    </Fragment>

}

export default FeedbackPage