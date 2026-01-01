import React from "react";
import { Typography,Box,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { useState } from 'react'
import CheckCircleIcon  from '@material-ui/icons/CheckCircle'
import CancelIcon  from '@material-ui/icons/Cancel'

const Feedback = (props) => {
    const spaces = "              "
    const feedbackSuccess = `${spaces}Feedback successfully submitted!`
    
    const [error , setError] = useState('')

    let formInfo = {title: '', description: '', collect_username: false}

    const changeInfo = (type) => {
        const element = id(type)
        if (element.type == 'checkbox') {
            formInfo[type] = document.getElementById(type).checked;
        } else{
            formInfo[type] = document.getElementById(type).value;
        }

    }

    const id = (elementId) => {
        return document.getElementById(elementId)
    }

    const submitInfo = () => {

        if (formInfo.title.length != 0 && formInfo.description.length != 0) {
            id('submit_failure').style.display = "none"
            id('submit_success').style.display = "block"
            setTimeout(() => {id('submit_success').style.display = "none"}, 3000)

            const goAhead = fetch('/api/send-feedback', {
                method: 'POST',
                body: JSON.stringify({...formInfo, user: props.session.user.name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        else {
            if (formInfo.title.length == 0 && formInfo.description.length > 0) {
                setError(`${spaces}Your title is empty!`)
            }  
            
            if (formInfo.title.length > 0 && formInfo.description.length == 0) {
                setError(`${spaces}Your description is empty!`)
            }
            if (formInfo.title.length == 0 && formInfo.description.length == 0) {
                setError(`${spaces}Your title and description are both empty!`)
            }
            id('submit_success').style.display = "none"
            id('submit_failure').style.display = "block"
            setTimeout(() => {id('submit_failure').style.display = "none"}, 3000)

        }
    }

    return (
        <>
        <Grid maxWidth="xl" item xs={12}>
        <Card style={{height: 'auto', display: 'flex', flexDirection: 'column'}}>
        <CardContent style={{flexGrow: 1, left:15, position: "relative", width: "calc(100% - 30px)",textAlign: 'center'}}>
        <span style={{position: "relative", fontSize: 30, left: 10, fontFamily: "verdana", top: 0, width: "calc(100% - 80px)"}}>Feedback</span>
        <br />
     <span style={{position: "relative", fontSize: 18, fontWeight: 700, left: 10, fontFamily: "arial", top: 0, width: "calc(100% - 80px)"}}>Have a feature you want to see in AMGX? Want to see some improvements? Or found a bug you want fixed? Tell us about it right here! Your feedback is invaluable to us.</span>
        <br /><br /><br />
        <Grid container alignItems="center" id='title_grid'>
        <Grid item sm={false} md={3} style={{position:'relative'}}  />
        <Grid item sm={12} md={6} style={{position:'relative'}} >
            <TextField variant="outlined"  style={{width: 'calc(100% - 100px)'}} inputProps={{style: {}}} label="Title" placeholder="Provide a general description of your issue" id='title' onInput={() => changeInfo('title')}/>
        </Grid>
        <Grid item sm={false} md={3} style={{position:'relative'}} />
        </Grid>
        <br />
        <Grid container alignItems="center" id='title_grid'>
        <Grid item xs={12}style={{position:'relative'}} >
            <TextField multiline variant="outlined" label='Description' style={{width: 'calc(100% - 100px)', font: 'arial'}}placeholder="Describe your issue in as much detail as possible." id='description' onInput={() => changeInfo('description')}/>
        </Grid>
        </Grid>
        <br />

        <Grid container alignItems="center" id='username_check_grid'>
        <Grid item xs={12}style={{position:'relative'}} >
            <input type='checkbox' label='Description' style={{width: 'calc(100% - 100px)', width: 25, height: 25}} id='collect_username' onInput={() => changeInfo('collect_username')}/>
            <span style={{position: "relative", fontSize: 20, fontWeight: 700, left: 10, fontFamily: "arial", top: -5, width: "calc(100% - 80px)"}}>Collect username</span>

        </Grid>
        </Grid>
        <br /><br />
        <Button onClick={submitInfo} style={{ backgroundColor: "cornflowerblue", padding: "5px", width: 120}}><Typography style={{ fontSize: 20, textTransform: "initial", color: "white" }}>Submit</Typography></Button>
        <br /><br />

        <div id="submit_success" style={{position: "relative", display: 'none'}}>
            <CheckCircleIcon style={{color: 'green'}}/><span style={{fontSize: 18, position: 'relative', top: -5}}>{feedbackSuccess}</span>
        </div>
        <div id="submit_failure" style={{position: "relative", display: "none"}}>
            <CancelIcon style={{color: 'red'}}/><span style={{fontSize: 18, position: 'relative', top: -5}}>{error}</span>
        </div>
        <span style={{position: "relative", fontSize: 14, fontWeight: 700, left: 10, fontFamily: "arial", top: 0, width: "calc(100% - 80px)"}}>Note: We collect username info when sending feedback so that you can be contacted directly by the developers of AMGX on Discord if you wish to be. For further support, please </span>
        <a style={{position: "relative", fontSize: 14, fontWeight: 700, left: 10, fontFamily: "arial", top: 0, width: "calc(100% - 80px)", textDecoration: 'underline', color: 'blue'}} href="https://discord.com/invite/NQcfMgRa7W">   join our support Discord server.</a>


        </CardContent>
        </Card></Grid></> 

    )
}

export default Feedback