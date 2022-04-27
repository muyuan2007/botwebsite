import React from "react";
import { Typography,Box,Divider, Tabs, Tab,TextField,AppBar,Switch, Drawer,Button,ButtonGroup, Card, CardActions, CardContent, CardMedia, Checkbox, CssBaseline, Grid, Toolbar, Container, Select } from '@material-ui/core'
import { green, blue } from '@material-ui/core/colors';
import { styled, useTheme, makeStyles } from '@material-ui/core/styles'
import MenuIcon from "@material-ui/icons/Menu";
import { DataGrid } from '@material-ui/data-grid';
import SecurityIcon from '@material-ui/icons/Security';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import QuestionMarkIcon from '@material-ui/icons/QuestionAnswer';
import BuildIcon from '@material-ui/icons/Build';
import PanToolIcon from '@material-ui/icons/PanTool';
import HomeIcon from '@material-ui/icons/HomeRounded';
import useStyles from './styles'
import classes from './Weblog.module.css'

const columns = [
    { field: "id", headerName: "ID",  hide: true},
    { field: "time", headerName: 'Time', flex:0.2, wordWrap: "normal"},
    { field: "user", headerName: "User", flex:0.3},
    { field: "action", headerName:"Action",flex:1},
];
const rows = [];
const logEvents = ["Dashboard Changes", "Bot Audit Logs", "Moderation Events","Command Usage"]
const Weblog = () => {
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <>
        

        <Container maxWidth="xl" className={classes.cardGrid}>
            <Grid item maxWidth="xl" xs={12}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                    <Typography style={{position: "relative", fontSize: 30, left:10,fontFamily: "verdana", top: 0, width: "calc(100% - 80px)"}}>Actions</Typography>
                        <footer className={classes.footerInBetween}></footer>
                        <Grid container spacing={2} className={classes.tabGrid} xs={12}>
                            {logEvents.map((eventType) => (
                                <Grid item key={eventType} xs={12} sm={6} md={3}>
                                <Button style={{backgroundColor:"lightgray", width: "100%", position: "relative", display: "flex", flexDirection: "column"}}><Typography className={classes.buttonText}>{eventType}</Typography></Button>
                                </Grid>
                            ))}
                        </Grid>
                        <div style={{width: "calc(100% - 20px)", height: 400, position: "relative", top: 15, left: 10 , wordWrap:"break-word"}}>
                        <DataGrid rowsPerPageOptions={[20, 50, 100]} rows={rows} columns={columns}></DataGrid>
                        </div>
                        <div style={{width: "calc(100% - 20px)", height: 400, display: "none",position: "relative", top: 15, left: 10 , wordWrap:"break-word"}}>
                        <DataGrid rowsPerPageOptions={[20, 50, 100]} rows={rows} columns={columns}></DataGrid>
                        </div>
                        <div style={{width: "calc(100% - 20px)", height: 400, display: "none",position: "relative", top: 15, left: 10 , wordWrap:"break-word"}}>
                        <DataGrid rowsPerPageOptions={[20, 50, 100]} rows={rows} columns={columns}></DataGrid>
                        </div>
                    </CardContent>
                    <footer className={classes.cardFooter}></footer>
                </Card>

            </Grid>
        </Container>
        </>
    )
    
}

export default Weblog