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

      <hr/>
           <Appbar position="static" color="primary" className = {classes.appBar} >
            <p>
           This was brought to you by
            </p>
           </Appbar>
                
    </div>    
)
}

export default Layout