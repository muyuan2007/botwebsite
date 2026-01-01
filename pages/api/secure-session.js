import { getSession } from "next-auth/react"

async function handler(req, res) {
    if (req.method === 'GET') {
        
        var session = await getSession({req})
        if (session == null) {
            res.status(200).json(null)
        } else {
            res.status(200).json(session.user)
        }
    }
}

export default handler