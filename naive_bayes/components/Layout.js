import Header from './Header'
import Meta from './Meta'
import Container from '@material-ui/core/Container'
import Appbar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    
  }));
const Layout  = props => {
const classes = useStyles()
return (
    <div>
        <Meta />
        <Header / >
            <Container maxWidth="sm">
                {props.children}
            </Container>

           <Appbar position="static" color="primary" className = {classes.appBar} >
            <div className = "footerText">
           This Post was made possible by 
            </div>
           </Appbar>
        <style jsx>{`
      .footerText {
       color = black;
       font-size: 1.2rem;
      letter-spacing: -0.5px;
      line-height: 1.5;
      }
    `}</style>
                
    </div>    
)
}

export default Layout