async function handler(req, res) {
    if (req.method === 'POST') {
        

        const information = req.body;


        let description = ""
        if (information.collect_username == true) {
            description += `**User: ** ${information.user}\n\n`
        }

        description += `**Details: ** ${information.description}`

        let embed = {title: information.title, description: description, color: 0x40fc0c}


        const feedbackToken = process.env.FEEDBACK_BOT_TOKEN

        fetch("https://discord.com/api/channels/1125957448365252649/messages", {
            method: 'POST',
            headers: {
                Authorization: `Bot ${feedbackToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({embeds: [embed]})
        })
    }
    res.status(201).json({message: "success"})

}

export default handler