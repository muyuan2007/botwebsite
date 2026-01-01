import classes from './Loading.module.css'
import {Typography} from '@material-ui/core'

const Loader = (props) => {
    
    if (props.fullScreen) {
        return (<div style={{height: '100vh', width: '100vw', alignContent: 'center', position: 'relative'}}>
        <div className={classes.loader} style={{position: 'relative', top: 'calc(50% - 40px)', left: 'calc(50% - 40px)'}}>
        </div>
        <img className={classes.icon} src='/favicon.ico' height={40} style={{position: 'absolute', left: 'calc(50% - 20px)' , top: 'calc(50% - 20px)'}} />
        <Typography style={{width: '100%', position: 'absolute', top: 'calc(50% + 50px)', textAlign: 'center'}}>{props.text}</Typography>
    </div>
    )
    } else {
        return (<div style={{height: '100%', width: '100%', alignContent: 'center', position: 'relative'}}>
        <div className={classes.loader} style={{position: 'relative', top: 'calc(50% - 40px)', left: 'calc(50% - 40px)'}}>
        </div>
        <img className={classes.icon} src='/favicon.ico' height={40} style={{position: 'absolute', left: 'calc(50% - 20px)' , top: 'calc(50% - 20px)'}} />
        <Typography style={{width: '100%', position: 'absolute', top: 'calc(50% + 50px)', textAlign: 'center'}}>{props.text}</Typography>
    </div>
    )
    }
}


const HomeLoader = (props) => {
    
    if (props.fullScreen) {
        return (<div style={{height: '100vh', width: '100vw', alignContent: 'center', position: 'relative', backgroundColor: '#b6d7f7ff'}}>
        <div className={classes.loader} style={{position: 'relative', top: 'calc(50% - 40px)', left: 'calc(50% - 40px)'}}>
        </div>
        <img className={classes.icon} src='/favicon.ico' height={40} style={{position: 'absolute', left: 'calc(50% - 20px)' , top: 'calc(50% - 20px)'}} />
        <Typography style={{width: '100%', position: 'absolute', top: 'calc(50% + 50px)', textAlign: 'center'}}>{props.text}</Typography>
    </div>
    )
    } else {
        return (<div style={{height: '100%', width: '100%', alignContent: 'center', position: 'relative', backgroundColor: '#b6d7f7ff'}}>
        <div className={classes.loader} style={{position: 'relative', top: 'calc(50% - 40px)', left: 'calc(50% - 40px)'}}>
        </div>
        <img className={classes.icon} src='/favicon.ico' height={40} style={{position: 'absolute', left: 'calc(50% - 20px)' , top: 'calc(50% - 20px)'}} />
        <Typography style={{width: '100%', position: 'absolute', top: 'calc(50% + 50px)', textAlign: 'center'}}>{props.text}</Typography>
    </div>
    )
    }
}




export default Loader
export {HomeLoader}