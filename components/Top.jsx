import React, { Fragment } from "react";
import ReactDOM from 'react-dom'
import { Divider, TextField,AppBar,Switch, Drawer,Menu,MenuItem,Button,Typography,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home'
import QuestionMarkIcon from '@material-ui/icons/QuestionAnswer';
import BuildIcon from '@material-ui/icons/Build';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/styles'
import classes from './Bot.module.css'
import { signIn, signOut } from 'next-auth/react'
import { Avatar } from "@material-ui/core";
import Link from 'next/link'
import Image from 'next/image'

const top = 1750/52

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

  menuButton: {
    background: "transparent", 
    color: "white", 
    border: 'none',
    '&:hover': {
        color: '#e6e6e6'
    }
  },

  menuButtonText: {
    '@media (max-width: 900px)': {
      display: 'none'
    }
  },

  homeIcon: {
    width: 21, 
    lineHeight: 52,
    '&:hover': {
      color: '#e6e6e6'
  },

  avatarSection: {
    position: 'absolute', top: 'calc(50% - 15px)', left: -50, width: 30, height: 30,
    '&:hover': {
      color: '#e6e6e6'
    }
  }
  }

})
 
function Top(props) {

  const styles = useStyles();

    const appBar = React.useRef();
    const loggedIn = props.loggedIn;
    const avatarSection = React.useRef();
    let topright;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  
    if (loggedIn) {
        topright = <><Avatar  src={props.pfp} style={{position: 'absolute', top: 'calc(50% - 15px)', left: -50, width: 30, height: 30}}/><Typography aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} style={{marginLeft: 5, textTransform: "initial", fontSize: 15, color: "white", position: 'relative', left: -10}}>{props.name}</Typography>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/servers"><MenuItem onClick={handleClose}>My servers</MenuItem></Link>
        <MenuItem onClick={() => {signOut()}}>Logout</MenuItem>
      </Menu></>
    } else {
        topright = <><Button style={{background: "#ff867d", color: "white"}}><Typography style={{marginLeft: 2.5, textTransform: "initial", fontSize: 16, color: "white"}} onClick={props.signin}>Login</Typography></Button></>
    }

     

    const openAndClose = (event) => {
      const nav = document.getElementById('nav')
      const settings = document.getElementById('settings')
      const screenWidth = appBar.current.clientWidth
      if (nav != null && settings != null) {
        if (screenWidth >= 500) {
          if (nav.style.display != 'none') {
            nav.style.display = 'none'
            settings.style.width = '100%'
            settings.style.left = '0px'
          } else {
            nav.style.display = 'block'
            settings.style.width = 'calc(100% - 210px)'
            settings.style.left = '210px'
          }
        } else {
          if (nav.style.display != 'none') {
            nav.style.display = 'none'
            settings.style.width = '100%'
            
          } else {
            nav.style.display = 'block'
            
          }
        }
        
      }

    }

    const [style, setStyle] = React.useState({})
    React.useEffect(() => {
      if (loggedIn) {
        setStyle({
          width: `calc(100% - ${avatarSection.current.clientWidth + 26}px)`,
        })
      } else {
        setStyle({
          width: `calc(100% - 94px)`,
        })
      }
      
    }, [])
    
    
    return (
        <Fragment  >
        <CssBaseline />
        <AppBar position="fixed"id="bar"ref={appBar}  style={{width: '100vw', zIndex: 3}}>
            <Toolbar>
                
<Link href="/"><img className={classes.homeImg} src="/amgxlogo.png" width="150" /></Link>

<Grid id="buttons" style={{position: 'relative', width: style.width}} container>
<Link href="/">
<button className={classes.normallyInvis} style={{background: "transparent", color: "white", border: 'none'}}><HomeIcon className={styles.homeIcon}/></button>
</Link>
<Link href="https://discord.com/api/oauth2/authorize?client_id=834072169507848273&permissions=1642758405303&scope=bot">
<button className={styles.menuButton} ><AddIcon style={{width: 21, lineHeight: 52}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Invite</span></button>
</Link>
<Link href="https://discord.gg/bbqBzpmt6A" >
  <button className={styles.menuButton}><GroupIcon style={{ width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Discord</span></button>
</Link>
<Link href="https://discord.gg/NQcfMgRa7W">
<button className={styles.menuButton}><QuestionMarkIcon style={{width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Support</span></button>
</Link>
<Link href="/commands">
<button  className={styles.menuButton}><BuildIcon style={{width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Commands</span></button>
</Link>
<Link href="https://youtube.com/playlist?list=PL_O68s4giDMfb7_jgb1rrisRSS3Dc7x4t">
<button  className={styles.menuButton}><YouTubeIcon style={{width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Tutorials</span></button>
</Link>
<Link href="https://forms.gle/H9VjrV4ZoGzT2gkP8">
<button  className={styles.menuButton}><CommentIcon style={{ width: 21}}/><span style={{marginLeft: 5, textTransform: "initial", fontSize: 15, verticalAlign: `${top}%`}} className={styles.menuButtonText}>Feedback</span></button>
</Link>
</Grid>
<div ref={avatarSection} style={{position: 'absolute', right: 10, display: 'inline-block'}} item>{topright}</div>
                </Toolbar>
        </AppBar>
        </Fragment>
    )
}

export default Top