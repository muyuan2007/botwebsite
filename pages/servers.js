import { useRouter, Router } from 'next/router'
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useEffect, componentDidMount, useState } from 'react'
import { gridColumnLookupSelector, gridColumnsTotalWidthSelector } from '@material-ui/data-grid';

function Guilds(props) {
    const manager = 1312280161
    let actualguilds = []
    const [guilds, setGuilds] = useState([])
    let loggedIn = false
    const getthesession = async () => {
        const getsession = await getSession();
        if (getsession == null) {
            signIn('discord','localhost:8080/api/auth/callback/discord')
        } else {
            loggedIn = true
        }
}
    useEffect(async() => {
        getthesession()
        let token = ''
        var fetchUser = fetch('http://localhost:8080/api/auth/session').then(response => response.json()).then((data) => data.accessToken).then((data) => {return data})
        await fetchUser.then(data => {token=data})
        
        await fetch('https://discord.com/api/users/@me/guilds' ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {if (response.status !== 200) {return} response.json().then(function(data) {let guildInfo = []; Array.from(data).forEach(guild => {if (guild.permissions >= manager){guildInfo.push(guild)}}); setGuilds(guildInfo)})})
        
    },[])
    

    return <div>
        <p>my guilds</p>
          <ul>
              {guilds.map((guild) => {
                  return(<li><a key={guild.name} href={`/dashboard/${guild.id}/botsettings`}><p>{guild.name}</p></a></li>)
              })}
          </ul>
    </div>
}

export default Guilds