import React from "react";
import { Typography,Box,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'

const commands = [{'command': 'warn', 'description':'Give a member warning points.', 'usage': '/warn <member> <amount> [reason]', 'permissions': 'kick members, ban members'},
                  {'command': 'unwarn', 'description':'Remove warning points from a member.', 'usage': '/unwarn <member> <amount>', 'permissions': 'kick members, ban members'},
                  {'command': 'warns', 'description':"Check a member's warning points.", 'usage': '/warns [member]', 'permissions': 'none'},
                  {'command': 'mute', 'description':'Timeout/mute a member.', 'usage': '/mute <member> <duration> [reason]', 'permissions': 'moderate/mute members'},
                  {'command': 'unmute', 'description':'Un-timeout/unmute a member.', 'usage': '/unmute <member>', 'permissions': 'moderate/mute members'},
                  {'command': 'kick', 'description':'Kick a member.', 'usage': '/kick <member> [reason]', 'permissions': 'kick members'},
                  {'command': 'tempban', 'description':'Temporarily ban a member.', 'usage': '/tempban <member> <duration> [reason]', 'permissions': 'ban members'},
                  {'command': 'ban', 'description':'Ban a member.', 'usage': '/ban <member> [reason]', 'permissions': 'ban members'},
                  {'command': 'unban', 'description':'Unban a member.', 'usage': '/unban <member>', 'permissions': 'ban members'},
                  {'command': 'amsettings', 'description':'Check dashboard configuration settings for a certain type of setting.', 'usage': '/amsettings [table]', 'permissions': 'none'},
                  {'command': 'purge', 'description':'Purge up to 500 messages.', 'usage': '/purge <amount>', 'permissions': 'manage messages'},
                  {'command': 'infractions', 'description': "Check all of a member's infractions", 'usage': '/infractions <member> [page]', 'permissions': 'none'},
                  {'command': 'feedback', 'description': "Provide feedback for AMGX!", 'usage': '/feedback <title> <feedback>  ', 'permissions': 'none'}
                                
    ]
const desc = "Arguments surrounded by <> are required, while arguments surrounded by [] are optional. All duration arguments are in seconds. For the 'unwarn' command, enter 0 as the argument to remove all infraction points."

const Commands = () => {
    return (
        <div style={{width: 'calc(100% - 100px)', position: 'relative', left: 50}}>
        <Typography style={{fontSize: 25, fontWeight: 600}}>Commands</Typography>
        <table style={{fontFamily: 'arial', position: 'relative', borderCollapse: 'collapse'}}>
            <tr>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Command</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Description</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Usage</th>
                <th style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>Permissions required</th>
            </tr>
            {commands.map((command) => (
                <tr key={command.command}>
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.command}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.description}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.usage}</td> 
                <td style={{border: '1px solid #dddddd', textAlign: 'left', padding: 8}}>{command.permissions}</td> 
                </tr>
            ))}
        </table>
        <br />
        <Typography style={{fontSize: 15}}>{desc}</Typography>
        </div>

    )
}

export default Commands