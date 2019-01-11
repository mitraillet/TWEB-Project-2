import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import Subject from '@material-ui/icons/Subject';
import { AuthContext } from './AuthProvider';

const applicationName = 'TinDev';
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: theme.spacing.unit * 10,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paper: {
    padding: theme.spacing.unit / 2,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    backgroundColor: '#3f51b5',
    cursor: 'pointer'
  }
});

class Header extends React.Component {
  state = {
    mobileMoreAnchorEl: null,
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    return (
    <AuthContext>
      {({ user, signOut }) => {
        console.log(user);
        const {  mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const isConnectedOption = user ? 
          ( <React.Fragment>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit" onClick={() => window.location = '/conversations'}>
                    <MailIcon />
                  </IconButton>
                  <IconButton color="inherit" onClick={() => window.location = '/profil'}>
                    <AccountCircle />
                  </IconButton>
                  <IconButton color="inherit" onClick={() => window.location = '/projects'}>
                    <Subject />
                  </IconButton>
                  <IconButton color="inherit" onClick={() => window.location = '/propositions'}>
                    <PlaylistAdd />
                  </IconButton>
                  <IconButton color="inherit" onClick={signOut} >
                    <ExitToApp />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                    <MoreIcon />
                  </IconButton>
                </div> 
              </React.Fragment>
        ) : null ;
        

        const renderMobileMenu = (
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
          >
            <MenuItem>
              <IconButton color="inherit" onClick={() => window.location = '/conversations'}>
                <MailIcon />
              </IconButton>
              <p>Messages</p>
            </MenuItem>
            <MenuItem>
              <IconButton color="inherit" onClick={() => window.location = '/profil'}>
                <AccountCircle />
              </IconButton>
              <p>Profil</p>
            </MenuItem>
            <MenuItem>
              <IconButton color="inherit" onClick={() => window.location = '/projects'}>
                <Subject />
              </IconButton>
              <p>Mes Projets</p>
            </MenuItem>
            <MenuItem>
              <IconButton color="inherit" onClick={() => window.location = '/propositions'}>
                <PlaylistAdd />
              </IconButton>
              <p>Propositions</p>
            </MenuItem>
            <MenuItem onClick= {signOut}>
              <IconButton color="inherit">
                <ExitToApp />
              </IconButton>
              <p>Déconnexion</p>
            </MenuItem>
          </Menu>
        );

        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h3" color="inherit" noWrapc onClick={() => window.location = '/'}>
                  <Paper className={classes.paper} elevation={1} >
                    {applicationName}
                  </Paper>
                </Typography>
                {isConnectedOption}
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
          </div>
        );
      }
    }
    </AuthContext>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);