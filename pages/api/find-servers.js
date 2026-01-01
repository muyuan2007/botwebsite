import { getSession } from "next-auth/react"

async function handler(req, res) {
    if (req.method === 'GET') {
        
        let token = ''
        var fetchUser = await getSession({req})
        token = fetchUser.accessToken
        let serverResponse = []
        await fetch('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => response.json()).then(data => serverResponse = data)
        if (!(serverResponse instanceof Array)) {
            if ('message' in serverResponse) {
                if (serverResponse.message.includes('401')) {
                    res.status(401).json({'message': '401, need to login again!'})
                }
            }
        } else {
            res.status(200).json(serverResponse.filter(guild => {return String(guild['permissions']&32)=='32'}))
        }
    }
}

export default handler