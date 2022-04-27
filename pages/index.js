import Top from '../components/Top'
import { getSession, useSession, signIn, signOut } from 'next-auth/react'

function Home(props) {
    const { data: session } = useSession()

    if (session) {
        (session)
        return <p>hi</p>
    } else {
        return <p>hi</p>
    }
}


export default Home