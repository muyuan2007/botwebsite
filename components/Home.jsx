import React, { useEffect, useState } from "react";
import { Typography,IconButton,Box,Divider, MenuItem,Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import classes from './Home.module.css'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import { ImageSearch } from "@material-ui/icons";
import Image from "next/image"
import { makeStyles } from '@material-ui/styles'

const catchphrase = "Say Goodbye To Discord Mod Burnout."
const subheading = "Protect and elevate your server community while letting your mods chill in peace with Auto Moderator Generation X."

 
const features = {
    'Moderate Everything': {
        description: 'Clear your chat of spam of all kinds, nuke bad words and links, and clean up nasty n-word nicknames. And that\'s just the start.', 
        example: 'automod_comprehensive.gif'
    }, 
    'Anti-Bypass Police': {
        description: 'Bad actors spelling curse words l-i_k-e t!h-i_s or l1k3 th15 are no problem for AMGX.', 
        example: 'ai.gif'
    }, 
    'Warn Points, not Strikes': {
        description: "Ensure that your server members are punished exactly as necessary using AMGX's 'warn points' system.", 
        example: 'points.gif'
    }, 
    'Category-based Blacklisting': {
        description: "Let your mods relax by setting your own bad word/link categories, each with their own punishments.", 
        example: 'category.gif'
    }, 
    'Make AMGX Your Own': {
        description: "Customize AMGX to your desires using its simple web dashboard. Use its default settings if you're feeling lazy.", 
        example: 'customize.gif'
    }, 
    'Automated Punishments': {
        description: "Automatically mute, kick, and ban those stubborn repeat offenders. The warn points system means that users with serious infractions are quickly dealt with.", 
        example: 'autopunish.gif'
    }, 
    'Detailed Logging': {
        description: "Log nearly every kind of event in your server, as well as who's responsible.", 
        example: 'modlog.gif'
    }, 
    'Filter New Users': {
        description: 'Automatically kick or ban new members if their profiles contain garbage.', 
        example: 'autokb.gif'
    }}

const useStyles = makeStyles({
    topButton: {
        backgroundColor: '#E0777D', 
        height: 50, 
        border: '3px solid #E0777D', 
        width: "calc(100% - 20px)", 
        position: 'relative',
        left: 10, 
        color: 'white',
        '&:hover': { 
            backgroundColor: "#FFFFFF", 
            color: '#E0777D',
            border: '3px solid #FFFFFF', 
        }
    },

    loginButton: {
        backgroundColor: '#E0777D', 
        width: '60%', 
        height: 50, 
        position: 'relative', 
        left: `20%`, 
        border: '3px solid #E0777D', 
        color: 'white',
        '&:hover': { 
            backgroundColor: "#FFFFFF", 
            color: '#E0777D',
            border: '3px solid #FFFFFF', 
        }
    },

    menuButton: {
        '&:hover': {
            color: 'lightgray'
        }
    }

})



const TopPart = (props) => {


    const styles = useStyles()


    const resize = () => {
        if (window.location.href.endsWith('/')) {
            const w = window.innerWidth
            const logo = document.getElementById("logo");
            logo.style.top = `calc(50% - ${logo.offsetHeight/2}px)`
    
            if (w >= 1000) {
                document.getElementById("headline").style.fontSize = '45px'
            }
            else if (900 <= w && w< 1000) {
                document.getElementById("headline").style.fontSize = '42px'
            }
    
            else if (800 <= w && w < 900) {
                document.getElementById("headline").style.fontSize = '39px'
            } 
            
            else {
                document.getElementById("headline").style.fontSize = '36px'
            }
    
            const buttonTexts = Array.from(document.getElementsByClassName('buttonText'))
            let buttons;

            if (props.loggedIn) {
                buttons = Array.from(document.getElementsByClassName(styles.topButton))
            } else {
                buttons = Array.from(document.getElementsByClassName(styles.loginButton))

            }
            
            if (450 <= w && w <= 525) {
                document.getElementById('red_buttons').style.width = '100%'
                document.getElementById('red_buttons').style.left = '0%'
                buttonTexts.forEach(text => text.style.fontSize = '18px')
                buttons.forEach(button => {button.style.width = '100%'; button.style.left = '0px';})
            } else if (w < 450) {
                document.getElementById('red_buttons').style.width = '100%'
                document.getElementById('red_buttons').style.left = '0%'
                buttonTexts.forEach(text => text.style.fontSize = '16px')
                buttons.forEach(button => {button.style.width = '100%'; button.style.left = '0px';})

            } else {
                document.getElementById('red_buttons').style.position = 'relative'
                document.getElementById('red_buttons').style.width = '70%'
                document.getElementById('red_buttons').style.left = '15%'
                buttonTexts.forEach(text => text.style.fontSize = '20px')


                buttons.forEach(button => button.style.width = 'calc(100% - 20px)')
                if (w > 900) {
                    buttons.forEach(button =>  button.style.left = '10px')
                } else {
                    buttons.forEach(button =>  button.style.left = '0px')

                }

            }
        }
        

    }

    useEffect(() => {
        resize()
        window.addEventListener('resize', function () {
            resize()
        })
    })
    let section;
    if (props.loggedIn) {
        section = <Grid container style={{width:"70%", position: 'relative', left:'15%'}} id='red_buttons'>
            <Grid item xs={12} lg={6}>
            <Link href="https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot">
            <Button className={styles.topButton} ><AddIcon /><span style={{textTransform: "initial",fontSize: 20, position: "relative",left: 10}} className="buttonText">Add to Discord</span></Button>
            </Link>
            <Space height={20} />

            </Grid>
            <Grid item xs={12} lg={6}>
            <Link href="/servers">
            <Button className={styles.topButton}><SettingsIcon /><span style={{textTransform: "initial",fontSize: 20, position: "relative",left: 10}} className="buttonText" >Manage</span></Button>
            </Link>
            </Grid>
            </Grid>
    } else {
        section = <div id='red_buttons'>
        <Button className={styles.loginButton}  onClick={props.signin}><ExitToAppIcon /><span className="buttonText" style={{textTransform: "initial",fontSize: 20, position: "relative",left: 10}}>Log in with Discord</span></Button>
        </div>
    }

    let headline = <>
    <Typography id='headline' style={{fontSize: 45, color: '#7AF583', fontWeight: 700, width: 'calc(100% - 30px)', lineHeight: '130%'}}>{catchphrase}</Typography>
    <Space height={20} />
    <Typography id='subheading' style={{fontSize: 18, color: '#58fb52', width: 'calc(100% - 30px)'}}>{subheading}</Typography>
    </>


    return (
        <Container  maxWidth="xl" style={{position: 'relative',  width: 'calc(100% - 100px)'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                {headline}
                <Space height={50} />
                {section}

                </Grid>
                <Grid item xs={12} md={5}>
                    <img id="logo" src="/amgxlogo.png" style={{width: "100%", position: 'relative'}} />
                </Grid>
            </Grid>
        </Container>        
        )
}

const Space = (props) => {
    return (<div style={{height: props.height}}></div>)
}

const Features = () => {

    const default_imgheight = 325;
    
    useEffect(() => {
        resize()
        window.addEventListener('resize', () => {resize()})
        }, [])
    

    const resize = () => {
        const width = window.innerWidth;

        const images = Array.from(document.getElementsByClassName("featureImg"))
        const descriptions = Array.from(document.getElementsByClassName("description"))


        if (width < 900) {
            images.forEach(img => {img.style.width = `${width-100}px`; img.style.left = `calc(50% - ${img.offsetWidth/2}px)`; img.style.height = 'auto'; })

        } else {
            images.forEach(img => {img.style.width = 'calc(100% - 100px)'; img.style.height = `auto`; img.style.left = `calc(50% - ${img.offsetWidth/2}px)`; })
        }

        descriptions.forEach(desc => {desc.style.top = `calc(50% - ${desc.offsetHeight/2}px)`})

    }

    return (
        <div style={{backgroundColor: '#b6d7f7ff', height: 'calc(100%)'}}>
        <div style={{position: 'relative', width: 'calc(100% - 100px)', left: 50}}>

        <Typography style={{fontSize: 40, textAlign: "center", position: 'relative', top:30}}>Why AMGX?</Typography>
        <Space height={20} />

            <div>
                {Object.keys(features).map((feature) => (
                    <div key={feature}>
                    <Space height={40} />
                    <Grid container style={{position: 'relative'}}>
                        <Grid item xs={12} md={6} style={{position: 'relative'}}>
                            <img onLoad={() => {resize()}} className={'featureImg'} src={features[feature].example} height={default_imgheight} style={{position: 'relative', width: 'calc(100% - 100px)', height: 'auto', left: 'calc(50% - (100% - 100px))'}} title='hi' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <div  style={{position: 'relative'}} className={'description'}>
                        <Typography  style={{fontSize: 30, fontWeight: 600, textAlign: 'center'}}>{feature}</Typography>
                        <Space height={15}/>
                        <Typography style={{fontSize: 16, textAlign: 'center', width: 'calc(100% - 100px)', position: 'relative', left: 50}}>{features[feature].description}</Typography>
                        </div>

                        </Grid>
                    </Grid>
                    <Space height={40} />

                    <Space height={100} />

                    </div>

            ))}
        </div>
        </div>
        </div>
    )
}

export { TopPart }
export default Features